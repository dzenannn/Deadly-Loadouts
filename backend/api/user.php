<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$killer = isset($_SESSION['killer']) ? $_SESSION['killer'] : null;

echo json_encode([
  'killer' => $killer
]);
