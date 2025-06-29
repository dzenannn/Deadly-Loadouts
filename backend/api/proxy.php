<?php
$url = 'https://dbd.tricky.lol/api/events';

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