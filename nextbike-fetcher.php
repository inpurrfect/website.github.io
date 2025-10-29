<?php
// nextbike-fetcher.php - Fetch rental data using your Nextbike credentials
session_start();

header('Content-Type: application/json');

// Configuration - Store these securely!
$credentials = require('D:/website/website/website/nextbike-credentials.php');
define('NEXTBIKE_USERNAME', $credentials['username']);
define('NEXTBIKE_PASSWORD', $credentials['password']);
define('NEXTBIKE_BASE_URL', 'https://my.nextbike.net/office');
define('COOKIE_FILE', sys_get_temp_dir() . '/nextbike_cookies.txt');

$action = $_GET['action'] ?? '';

switch($action) {
    case 'fetch_rental':
        fetchRentalData($_GET['id'] ?? null);
        break;

    case 'test_connection':
        testConnection();
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Invalid action']);
}

function testConnection() {
    if (loginToNextbike()) {
        echo json_encode(['success' => true, 'message' => 'Connected to Nextbike successfully!']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to connect to Nextbike']);
    }
}

function loginToNextbike() {
    $ch = curl_init();

    // Step 1: Get login page to get CSRF token
    curl_setopt($ch, CURLOPT_URL, NEXTBIKE_BASE_URL . '/login');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE);
    curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For development only

    $login_page = curl_exec($ch);

    // Extract CSRF token if present
    preg_match('/<input[^>]*name=["\']_csrf["\'][^>]*value=["\']([^"\']+)["\']/', $login_page, $csrf_match);
    $csrf_token = $csrf_match[1] ?? '';

    // Step 2: Submit login form
    $login_data = [
        'username' => NEXTBIKE_USERNAME,
        'password' => NEXTBIKE_PASSWORD,
        '_csrf' => $csrf_token
    ];

    curl_setopt($ch, CURLOPT_URL, NEXTBIKE_BASE_URL . '/login');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($login_data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    // Check if login was successful
    // Usually, successful login redirects or shows different content
    $success = ($http_code == 200 && strpos($response, 'logout') !== false);

    if ($success) {
        logActivity('nextbike_login', 'success', 'Logged into Nextbike system');
    } else {
        logActivity('nextbike_login', 'failed', 'Failed to login to Nextbike');
    }

    return $success;
}

function fetchRentalData($rental_id) {
    if (empty($rental_id)) {
        echo json_encode(['success' => false, 'error' => 'Rental ID required']);
        return;
    }

    // Check if we have a valid session, if not login
    if (!isSessionValid()) {
        if (!loginToNextbike()) {
            echo json_encode(['success' => false, 'error' => 'Failed to authenticate with Nextbike']);
            return;
        }
    }

    // Fetch rental page
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, NEXTBIKE_BASE_URL . "/rentals/edit/{$rental_id}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $html = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code != 200) {
        echo json_encode(['success' => false, 'error' => 'Failed to fetch rental data']);
        return;
    }

    // Parse the HTML to extract data
    $rental_data = parseRentalHTML($html);

    if ($rental_data) {
        logActivity('rental_fetched', 'success', "Fetched rental {$rental_id}");
        echo json_encode([
            'success' => true,
            'rental' => $rental_data
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to parse rental data']);
    }
}

function parseRentalHTML($html) {
    $data = [];

    // Create DOMDocument to parse HTML
    $dom = new DOMDocument();
    @$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
    $xpath = new DOMXPath($dom);

    // Helper function to extract value by label
    $extractValue = function($label) use ($xpath) {
        $query = "//td[contains(text(), '{$label}')]/following-sibling::td[1]";
        $node = $xpath->query($query)->item(0);
        return $node ? trim($node->textContent) : null;
    };

    // Extract all relevant fields based on your screenshot
    $data['rental_number'] = $extractValue('Numer roweru:');
    $data['start_time'] = $extractValue('Godzina rozpoczęcia wynajmu :');
    $data['end_time'] = $extractValue('Godzina zwrotu roweru :');
    $data['lock_code'] = $extractValue('Kod otwierający zamek:');
    $data['start_location'] = $extractValue('Miejsce wynajmu roweru :');
    $data['end_location'] = $extractValue('Miejsce zwrotu roweru:');
    $data['distance_km'] = $extractValue('Odległość (km):');
    $data['distance_estimated'] = $extractValue('Distance (estimated, km):');
    $data['rating'] = $extractValue('Rating:');
    $data['base_price'] = $extractValue('original base price:');
    $data['adjusted_base_price'] = $extractValue('adjusted base price:');
    $data['service_fee'] = $extractValue('original service fee:');
    $data['adjusted_service_fee'] = $extractValue('adjusted service fee:');
    $data['currency'] = $extractValue('Waluta:');
    $data['voucher_group'] = $extractValue('Grupa voucherów:');
    $data['language'] = $extractValue('Język:');
    $data['system'] = $extractValue('System Nextbike:');
    $data['tariff'] = $extractValue('Taryfa:');
    $data['city'] = $extractValue('Miasto:');
    $data['rental_type'] = $extractValue('Wynajem:');
    $data['return_type'] = $extractValue('Zwrot:');

    // Extract comments if present
    $comment_query = "//td[contains(text(), 'Komentarz')]/following-sibling::td[1]//textarea";
    $comment_node = $xpath->query($comment_query)->item(0);
    $data['comment'] = $comment_node ? trim($comment_node->textContent) : null;

    // Clean up data (remove extra whitespace, newlines)
    foreach ($data as $key => $value) {
        if ($value) {
            $data[$key] = preg_replace('/\s+/', ' ', $value);
        }
    }

    return $data;
}

function isSessionValid() {
    // Check if cookie file exists and is recent (less than 30 minutes old)
    if (!file_exists(COOKIE_FILE)) {
        return false;
    }

    $file_age = time() - filemtime(COOKIE_FILE);
    if ($file_age > 1800) { // 30 minutes
        return false;
    }

    return true;
}

function logActivity($action, $status, $details) {
    $log_file = 'nextbike_fetch_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    $log_entry = "[$timestamp] Action: $action | Status: $status | Details: $details\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);
}
?>