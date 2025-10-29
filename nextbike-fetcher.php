<?php
// nextbike-fetcher.php - Fetch rental data using your Nextbike credentials
session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Configuration - Try multiple paths for credentials
$credentials = null;
$possible_paths = [
    __DIR__ . '/nextbike-credentials.php',
    __DIR__ . '/config/nextbike-credentials.php',
    getenv('NEXTBIKE_CREDENTIALS_PATH') ?: null
];

foreach ($possible_paths as $path) {
    if ($path && file_exists($path)) {
        $credentials = require($path);
        break;
    }
}

// Fallback to environment variables or POST/GET parameters
if (!$credentials) {
    $credentials = [
        'username' => $_POST['username'] ?? $_GET['username'] ?? getenv('NEXTBIKE_USERNAME') ?? '',
        'password' => $_POST['password'] ?? $_GET['password'] ?? getenv('NEXTBIKE_PASSWORD') ?? ''
    ];
}

// Store in session for subsequent requests
if (!empty($_POST['username']) && !empty($_POST['password'])) {
    $_SESSION['nextbike_username'] = $_POST['username'];
    $_SESSION['nextbike_password'] = $_POST['password'];
}

if (empty($credentials['username']) || empty($credentials['password'])) {
    if (isset($_SESSION['nextbike_username']) && isset($_SESSION['nextbike_password'])) {
        $credentials = [
            'username' => $_SESSION['nextbike_username'],
            'password' => $_SESSION['nextbike_password']
        ];
    } else {
        echo json_encode(['success' => false, 'error' => 'Nextbike credentials not found. Please provide username and password.']);
        exit;
    }
}

define('NEXTBIKE_USERNAME', $credentials['username']);
define('NEXTBIKE_PASSWORD', $credentials['password']);
define('NEXTBIKE_BASE_URL', 'https://my.nextbike.net/office');
define('COOKIE_FILE', sys_get_temp_dir() . '/nextbike_cookies_' . md5(NEXTBIKE_USERNAME) . '.txt');

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch($action) {
    case 'fetch_rental':
        fetchRentalData($_GET['id'] ?? $_POST['id'] ?? null);
        break;

    case 'test_connection':
        testConnection();
        break;
    
    case 'login':
        handleLogin();
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Invalid action']);
}

function handleLogin() {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'error' => 'Username and password required']);
        return;
    }
    
    $_SESSION['nextbike_username'] = $username;
    $_SESSION['nextbike_password'] = $password;
    
    // Temporarily override credentials
    $result = loginToNextbike($username, $password);
    
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Login successful']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Login failed. Check credentials.']);
    }
}

function testConnection() {
    if (loginToNextbike()) {
        echo json_encode(['success' => true, 'message' => 'Connected to Nextbike successfully!']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to connect to Nextbike']);
    }
}

function loginToNextbike($username = null, $password = null) {
    $username = $username ?? NEXTBIKE_USERNAME;
    $password = $password ?? NEXTBIKE_PASSWORD;
    
    $ch = curl_init();

    // Clear old cookies
    if (file_exists(COOKIE_FILE)) {
        @unlink(COOKIE_FILE);
    }

    // Step 1: Get login page to get CSRF token and session cookies
    curl_setopt_array($ch, [
        CURLOPT_URL => NEXTBIKE_BASE_URL . '/login',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_COOKIEJAR => COOKIE_FILE,
        CURLOPT_COOKIEFILE => COOKIE_FILE,
        CURLOPT_FOLLOWLOCATION => false, // Don't follow redirects automatically
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        CURLOPT_HTTPHEADER => [
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.5',
            'Accept-Encoding: gzip, deflate',
            'Connection: keep-alive',
        ]
    ]);

    $login_page = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if ($http_code !== 200) {
        curl_close($ch);
        logActivity('nextbike_login', 'failed', "Failed to load login page. HTTP: $http_code");
        return false;
    }

    // Extract CSRF token - try multiple patterns
    $csrf_token = '';
    $patterns = [
        '/<input[^>]*name=["\']_csrf["\'][^>]*value=["\']([^"\']+)["\']/i',
        '/<input[^>]*name=["\']csrf_token["\'][^>]*value=["\']([^"\']+)["\']/i',
        '/<input[^>]*name=["\']token["\'][^>]*value=["\']([^"\']+)["\']/i',
        '/name=["\']_token["\'][^>]*value=["\']([^"\']+)["\']/i',
        '/csrf[_-]token["\'][^>]*value=["\']([^"\']+)["\']/i'
    ];
    
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $login_page, $matches)) {
            $csrf_token = $matches[1];
            break;
        }
    }

    // Step 2: Submit login form
    $login_data = [
        'username' => $username,
        'password' => $password
    ];
    
    if (!empty($csrf_token)) {
        $login_data['_csrf'] = $csrf_token;
    }

    curl_setopt_array($ch, [
        CURLOPT_URL => NEXTBIKE_BASE_URL . '/login',
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($login_data),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true, // Follow redirects to see if we get to dashboard
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_REFERER => NEXTBIKE_BASE_URL . '/login',
    ]);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $redirect_url = curl_getinfo($ch, CURLINFO_REDIRECT_URL);
    $effective_url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    
    curl_close($ch);

    // Check if login was successful
    // Success indicators: redirect to dashboard, no login form in response, logout link present
    $success_indicators = [
        strpos($effective_url, '/login') === false && $http_code == 200,
        strpos($response, 'logout') !== false || strpos($response, 'Logout') !== false,
        strpos($response, 'dashboard') !== false,
        strpos($response, 'rentals') !== false,
        strpos($response, 'Invalid') === false && strpos($response, 'error') === false && strpos($response, 'incorrect') === false,
    ];
    
    // Also check for failure indicators
    $failure_indicators = [
        strpos($response, 'Invalid username') !== false,
        strpos($response, 'Invalid password') !== false,
        strpos($response, 'incorrect') !== false && strpos($response, 'username') !== false,
        strpos($effective_url, '/login') !== false && $http_code == 200,
    ];
    
    $success_count = count(array_filter($success_indicators));
    $failure_count = count(array_filter($failure_indicators));
    
    $success = $success_count > 0 && $failure_count == 0;

    if ($success) {
        logActivity('nextbike_login', 'success', "Logged into Nextbike system for user: $username");
        return true;
    } else {
        $error_msg = "Failed to login. HTTP: $http_code, Redirect: " . ($redirect_url ?? 'none') . ", URL: $effective_url";
        logActivity('nextbike_login', 'failed', $error_msg);
        return false;
    }
}

function fetchRentalData($rental_id) {
    if (empty($rental_id)) {
        echo json_encode(['success' => false, 'error' => 'Rental ID required']);
        return;
    }

    // Check if we have a valid session, if not login
    if (!isSessionValid()) {
        $login_success = false;
        
        // Try with session credentials first
        if (isset($_SESSION['nextbike_username']) && isset($_SESSION['nextbike_password'])) {
            $login_success = loginToNextbike($_SESSION['nextbike_username'], $_SESSION['nextbike_password']);
        }
        
        // Fallback to configured credentials
        if (!$login_success) {
            $login_success = loginToNextbike();
        }
        
        if (!$login_success) {
            echo json_encode(['success' => false, 'error' => 'Failed to authenticate with Nextbike. Please check credentials.']);
            return;
        }
    }

    // Fetch rental page
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => NEXTBIKE_BASE_URL . "/rentals/edit/{$rental_id}",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_COOKIEFILE => COOKIE_FILE,
        CURLOPT_COOKIEJAR => COOKIE_FILE,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        CURLOPT_HTTPHEADER => [
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.5',
            'Connection: keep-alive',
            'Referer: ' . NEXTBIKE_BASE_URL . '/rentals'
        ]
    ]);

    $html = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code != 200) {
        echo json_encode(['success' => false, 'error' => 'Failed to fetch rental data. HTTP code: ' . $http_code]);
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
    libxml_use_internal_errors(true);
    @$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
    libxml_clear_errors();
    $xpath = new DOMXPath($dom);

    // Helper function to extract value by label (tries multiple patterns)
    $extractValue = function($labels) use ($xpath) {
        if (!is_array($labels)) {
            $labels = [$labels];
        }
        
        foreach ($labels as $label) {
            // Try different XPath patterns
            $queries = [
                "//td[contains(text(), '{$label}')]/following-sibling::td[1]",
                "//th[contains(text(), '{$label}')]/following-sibling::td[1]",
                "//label[contains(text(), '{$label}')]/following-sibling::*[1]",
                "//dt[contains(text(), '{$label}')]/following-sibling::dd[1]",
                "//div[contains(text(), '{$label}')]/following-sibling::*[1]",
            ];
            
            foreach ($queries as $query) {
                $node = $xpath->query($query)->item(0);
                if ($node) {
                    $value = trim($node->textContent);
                    if (!empty($value)) {
                        return $value;
                    }
                }
            }
        }
        return null;
    };

    // Extract all relevant fields - support multiple language labels
    $data['rental_number'] = $extractValue(['Numer roweru:', 'Bike Number:', 'Fahrrad-Nummer:']);
    $data['start_time'] = $extractValue(['Godzina rozpoczęcia wynajmu :', 'Start time:', 'Startzeit:', 'Rental start:']);
    $data['end_time'] = $extractValue(['Godzina zwrotu roweru :', 'End time:', 'Endzeit:', 'Rental end:']);
    $data['lock_code'] = $extractValue(['Kod otwierający zamek:', 'Lock code:', 'Schloss-Code:', 'Code:']);
    $data['start_location'] = $extractValue(['Miejsce wynajmu roweru :', 'Start location:', 'Startort:', 'Rental location:']);
    $data['end_location'] = $extractValue(['Miejsce zwrotu roweru:', 'End location:', 'Endort:', 'Return location:']);
    $data['distance_km'] = $extractValue(['Odległość (km):', 'Distance (km):', 'Distanz (km):']);
    $data['distance_estimated'] = $extractValue(['Distance (estimated, km):', 'Geschätzte Distanz (km):']);
    $data['rating'] = $extractValue(['Rating:', 'Bewertung:', 'Ocena:']);
    $data['base_price'] = $extractValue(['original base price:', 'Ursprünglicher Grundpreis:', 'Początkowa cena bazowa:']);
    $data['adjusted_base_price'] = $extractValue(['adjusted base price:', 'Angepasster Grundpreis:', 'Skorygowana cena bazowa:']);
    $data['service_fee'] = $extractValue(['original service fee:', 'Ursprüngliche Servicegebühr:', 'Początkowa opłata serwisowa:']);
    $data['adjusted_service_fee'] = $extractValue(['adjusted service fee:', 'Angepasste Servicegebühr:', 'Skorygowana opłata serwisowa:']);
    $data['currency'] = $extractValue(['Waluta:', 'Currency:', 'Währung:']);
    $data['voucher_group'] = $extractValue(['Grupa voucherów:', 'Voucher group:', 'Gutscheingruppe:']);
    $data['language'] = $extractValue(['Język:', 'Language:', 'Sprache:']);
    $data['system'] = $extractValue(['System Nextbike:', 'Nextbike System:', 'System:']);
    $data['tariff'] = $extractValue(['Taryfa:', 'Tariff:', 'Tarif:']);
    $data['city'] = $extractValue(['Miasto:', 'City:', 'Stadt:']);
    $data['rental_type'] = $extractValue(['Wynajem:', 'Rental:', 'Miete:']);
    $data['return_type'] = $extractValue(['Zwrot:', 'Return:', 'Rückgabe:']);

    // Extract customer message/comments - try multiple selectors
    $comment_queries = [
        "//td[contains(text(), 'Komentarz')]/following-sibling::td[1]//textarea",
        "//td[contains(text(), 'Comment')]/following-sibling::td[1]//textarea",
        "//td[contains(text(), 'Kommentar')]/following-sibling::td[1]//textarea",
        "//textarea[contains(@name, 'comment')]",
        "//textarea[contains(@id, 'comment')]",
        "//div[contains(@class, 'comment')]//textarea",
    ];
    
    $data['comment'] = null;
    foreach ($comment_queries as $query) {
        $comment_node = $xpath->query($query)->item(0);
        if ($comment_node) {
            $data['comment'] = trim($comment_node->textContent);
            break;
        }
    }

    // Extract customer information if available
    $data['customer_name'] = $extractValue(['Customer:', 'Kunde:', 'Klient:']);
    $data['customer_email'] = $extractValue(['Email:', 'E-Mail:', 'E-mail:']);
    $data['customer_phone'] = $extractValue(['Phone:', 'Telefon:', 'Telefon:']);

    // Clean up data (remove extra whitespace, newlines)
    foreach ($data as $key => $value) {
        if ($value) {
            $data[$key] = preg_replace('/\s+/', ' ', $value);
            $data[$key] = trim($data[$key]);
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
    $log_file = __DIR__ . '/nextbike_fetch_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    $log_entry = "[$timestamp] Action: $action | Status: $status | Details: $details\n";
    @file_put_contents($log_file, $log_entry, FILE_APPEND);
}
?>