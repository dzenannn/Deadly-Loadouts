<?php
$baseUrl = 'https://dbd.tricky.lol';

$path = isset($_GET['path']) ? $_GET['path'] : '';
$path = ltrim($path, '/');
$query = $_GET;
unset($query['path']);

$url = $baseUrl . '/' . $path;
if (!empty($query)) {
    $url .= '?' . http_build_query($query);
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: */*',
    'User-Agent: Mozilla/5.0'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
http_response_code($httpCode);

echo $response;
?>