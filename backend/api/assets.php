<?php
header('Content-Type: application/json');

$apiBase = 'https://dbd.tricky.lol/api';

function fetch($endpoint) {
    $url = $GLOBALS['apiBase'] . $endpoint;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: */*',
        'User-Agent: Mozilla/5.0'
    ]);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_USERAGENT => 'PHP Proxy'
    ]);
    $res = curl_exec($ch);
    curl_close($ch);

    $json = json_decode($res, true);
    return is_array($json) ? $json : [];
}

$perks = fetch('/perks') ?: [];
$survivors = fetch('/survivors') ?: [];
$killers = fetch('/killers') ?: [];

$data = [
    'perks' => array_map(fn($p) => [
        'name' => $p['name'],
        'src'  => 'https://dbd.tricky.lol/dbdassets/perks/' . $p['image']
    ], $perks),

    'survivors' => array_map(fn($s) => [
        'name' => $s['name'],
        'src'  => 'https://dbd.tricky.lol/dbdassets/portraits/' . $s['portrait']
    ], $survivors),

    'killers' => array_map(fn($k) => [
        'name' => $k['name'],
        'src'  => 'https://dbd.tricky.lol/dbdassets/portraits/' . $k['portrait']
    ], $killers),
];

echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
