<?php
session_start(); // 🔴 Ovo je OBAVEZNO da bismo koristili $_SESSION

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

$killer = $data['killer'] ?? '';

$_SESSION['killer'] = $killer;

echo json_encode([
    'killer' => $killer
]);
