<?php
/**
 * send-form.php
 *
 * Az ajánlatkérő űrlap szerveroldali feldolgozása. Hagyományos PHP/Apache
 * (LiteSpeed-kompatibilis) tárhelyre készült, külső könyvtár vagy
 * adatbázis nélkül.
 *
 * ÉLESÍTÉS ELŐTT PÓTLANDÓ (lásd MISSING-DATA.md is):
 *  - FORM_RECIPIENT: a fogadó e-mail cím
 *  - FROM_EMAIL / FROM_DOMAIN: saját, valós domaines feladó cím
 *  - SMTP-re állás esetén a mail() hívás lecserélése a választott
 *    levelezőkönyvtárra / SMTP kapcsolatra (SPF/DKIM/DMARC beállítással)
 *
 * Válaszformátum:
 *  - AJAX kérésnél (X-Requested-With: XMLHttpRequest fejléc, ezt a
 *    frontend /assets/js/main.js küldi) JSON választ ad.
 *  - Hagyományos, JavaScript nélküli beküldésnél (progresszív fallback)
 *    valódi HTTP redirekttel válaszol: siker esetén /koszonjuk/, hiba
 *    esetén vissza a hivatkozó oldalra, hibajelző paraméterrel.
 */

declare(strict_types=1);

mb_internal_encoding('UTF-8');

// --------------------------------------------------------------------
// Konfiguráció — ÉLESÍTÉS ELŐTT PÓTLANDÓ ÉRTÉKEK
// --------------------------------------------------------------------
const FORM_RECIPIENT = '[FOGADÓ E-MAIL CÍM]';
const FROM_NAME       = '[CÉGNÉV] weboldal';
const FROM_EMAIL      = 'noreply@[DOMAIN]';
const SUCCESS_REDIRECT = '/koszonjuk/';
const MAX_MESSAGE_LENGTH = 2000;
const MAX_SHORT_FIELD_LENGTH = 120;

// Csak ezek a mezők kerülnek feldolgozásra — minden más POST paramétert figyelmen kívül hagyunk.
const ALLOWED_FIELDS = ['nev', 'telefonszam', 'email', 'telepules', 'kartevo_tipusa', 'uzenet', 'adatkezeles_elfogadva'];
const REQUIRED_FIELDS = ['nev', 'telefonszam', 'email', 'kartevo_tipusa', 'adatkezeles_elfogadva'];
const HONEYPOT_FIELD = 'website';

// --------------------------------------------------------------------
// Segédfüggvények
// --------------------------------------------------------------------

function is_ajax_request(): bool
{
    return isset($_SERVER['HTTP_X_REQUESTED_WITH'])
        && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
}

/** Egysoros mezők tisztítása: CR/LF és vezérlőkarakterek eltávolítása (fejléc-injektálás elleni védelem), majd hosszkorlát. */
function sanitize_single_line(string $value, int $maxLength): string
{
    $value = str_replace(["\r", "\n", "\0"], '', $value);
    $value = trim($value);
    if (function_exists('mb_substr')) {
        $value = mb_substr($value, 0, $maxLength);
    } else {
        $value = substr($value, 0, $maxLength);
    }
    return $value;
}

function sanitize_multiline(string $value, int $maxLength): string
{
    // Vezérlőkaraktereket (a sortörés kivételével) eltávolítjuk, majd normalizáljuk a sortöréseket.
    $value = preg_replace('/[^\P{C}\n\r\t]/u', '', $value) ?? '';
    $value = str_replace("\r\n", "\n", $value);
    $value = str_replace("\r", "\n", $value);
    $value = trim($value);
    return mb_substr($value, 0, $maxLength);
}

function respond(bool $success, string $message, int $httpStatus = 200): void
{
    if (is_ajax_request()) {
        // A frontend (assets/js/main.js) a JSON body "success" mezője alapján
        // dönt, nem a HTTP státuszkód alapján — így a konkrét hibaüzenet
        // (pl. hiányzó mező, érvénytelen e-mail) mindig eljut a felhasználóhoz,
        // és egy 4xx/5xx válasz nem futtatja a fetch hívás generikus hibaágát.
        // A tényleges HTTP státuszt (pl. 422, 503) szerveroldali naplózásra és
        // a JS nélküli fallback ághoz tartjuk meg — ez utóbbi redirecttel dolgozik.
        http_response_code(200);
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Progresszív fallback: valódi redirect, hogy sikertelen beküldés
    // se generáljon hamis /koszonjuk/ pageview-t, illetve sikeres
    // feldolgozás után is tényleges (nem JS-vezérelt) navigáció történjen.
    if ($success) {
        header('Location: ' . SUCCESS_REDIRECT, true, 303);
        exit;
    }

    $fallback = safe_local_redirect_target($_SERVER['HTTP_REFERER'] ?? '', '/kapcsolat/');
    $separator = (strpos($fallback, '?') === false) ? '?' : '&';
    header('Location: ' . $fallback . $separator . 'hiba=1', true, 303);
    exit;
}

/** Csak saját domainre mutató, relatív útvonalra redirektelünk vissza — nyílt redirect elkerülése. */
function safe_local_redirect_target(string $referer, string $fallback): string
{
    if ($referer === '') {
        return $fallback;
    }
    $refererHost = parse_url($referer, PHP_URL_HOST);
    $currentHost = $_SERVER['HTTP_HOST'] ?? '';
    if ($refererHost === null || $currentHost === '' || strcasecmp($refererHost, $currentHost) !== 0) {
        return $fallback;
    }
    $path = parse_url($referer, PHP_URL_PATH) ?? $fallback;
    return $path !== '' ? $path : $fallback;
}

// --------------------------------------------------------------------
// 1) Csak POST kérést fogadunk
// --------------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Ez a végpont csak POST kérést fogad.', 405);
}

// --------------------------------------------------------------------
// 2) Bemenet whitelist alapján történő beolvasása és tisztítása
// --------------------------------------------------------------------
$input = [];
foreach (ALLOWED_FIELDS as $field) {
    $raw = $_POST[$field] ?? '';
    if (!is_string($raw)) {
        $raw = '';
    }
    if ($field === 'uzenet') {
        $input[$field] = sanitize_multiline($raw, MAX_MESSAGE_LENGTH);
    } else {
        $input[$field] = sanitize_single_line($raw, MAX_SHORT_FIELD_LENGTH);
    }
}

// --------------------------------------------------------------------
// 3) Honeypot ellenőrzés — botkitöltés esetén NEM dolgozzuk fel leadként.
//    A válasz szándékosan semleges, hogy ne áruljon el részletet a
//    kitöltött csapdamezőről.
// --------------------------------------------------------------------
$honeypotValue = $_POST[HONEYPOT_FIELD] ?? '';
if (is_string($honeypotValue) && trim($honeypotValue) !== '') {
    respond(false, 'A küldés sikertelen volt.', 400);
}

// --------------------------------------------------------------------
// 4) Kötelező mezők ellenőrzése
// --------------------------------------------------------------------
foreach (REQUIRED_FIELDS as $field) {
    if (trim((string) ($input[$field] ?? '')) === '') {
        respond(false, 'Kérjük, töltse ki a kötelező mezőket (név, telefonszám, e-mail, kártevő típusa, adatkezelési nyilatkozat).', 422);
    }
}

// --------------------------------------------------------------------
// 5) E-mail cím validálása — NEM bízunk a frontend validációban
// --------------------------------------------------------------------
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Kérjük, adjon meg érvényes e-mail címet.', 422);
}

// --------------------------------------------------------------------
// 6) Adatkezelési nyilatkozat elfogadásának ellenőrzése
// --------------------------------------------------------------------
if ($input['adatkezeles_elfogadva'] === '') {
    respond(false, 'Az adatkezelési tájékoztató elfogadása kötelező.', 422);
}

// --------------------------------------------------------------------
// 7) Konfiguráció épsége — ha a placeholder értékek még nincsenek
//    kitöltve, nem próbálunk (garantáltan kézbesíthetetlen) levelet
//    küldeni, és ezt egyértelműen jelezzük.
// --------------------------------------------------------------------
$configIncomplete = (strpos(FORM_RECIPIENT, '[') !== false) || (strpos(FROM_EMAIL, '[') !== false);
if ($configIncomplete) {
    error_log('send-form.php: hiányzó production konfiguráció (FORM_RECIPIENT / FROM_EMAIL placeholder).');
    respond(false, 'Az ajánlatkérő űrlap jelenleg nincs teljesen beüzemelve. Kérjük, keressen minket telefonon.', 503);
}

// --------------------------------------------------------------------
// 8) E-mail összeállítása és küldése
// --------------------------------------------------------------------
$subject = mb_encode_mimeheader(
    sprintf('Új weboldalas ajánlatkérés – %s', $input['kartevo_tipusa']),
    'UTF-8'
);

$bodyLines = [
    'Új ajánlatkérés érkezett a weboldalról.',
    '',
    'Név: ' . $input['nev'],
    'Telefonszám: ' . $input['telefonszam'],
    'E-mail: ' . $input['email'],
    'Település: ' . ($input['telepules'] !== '' ? $input['telepules'] : '(nincs megadva)'),
    'Kártevő típusa: ' . $input['kartevo_tipusa'],
    '',
    'Üzenet:',
    $input['uzenet'] !== '' ? $input['uzenet'] : '(nincs megadva)',
    '',
    '---',
    'Beküldés időpontja: ' . date('Y-m-d H:i:s'),
];
$body = implode("\n", $bodyLines);

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: ' . mb_encode_mimeheader(FROM_NAME, 'UTF-8') . ' <' . FROM_EMAIL . '>';
// A beküldő e-mail címét Reply-To-ként állítjuk be — a From fejléc mindig
// a saját domainhez tartozik, elkerülve a levelezőszerverek elutasítását
// és a fejléc-injektálási kockázatot.
$headers[] = 'Reply-To: ' . $input['email'];
$headerString = implode("\r\n", $headers);

$mailSent = @mail(FORM_RECIPIENT, $subject, $body, $headerString);

if (!$mailSent) {
    error_log('send-form.php: a mail() hívás sikertelen volt.');
    respond(false, 'A küldés sikertelen volt. Kérjük, próbálja meg később, vagy hívjon minket telefonon.', 502);
}

// --------------------------------------------------------------------
// 9) Sikeres feldolgozás
// --------------------------------------------------------------------
respond(true, 'Köszönjük, megkaptuk az ajánlatkérését!', 200);
