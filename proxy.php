<?php
// Proxy para Google Apps Script - Don Tasko
// Resolve problemas de CORS

// Permitir acesso de qualquer origem (CORS)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responder a preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// URL do seu Google Apps Script (substitua pelo seu URL real)
$script_url = 'https://script.google.com/macros/s/AKfycbxaC1Ptv2MT0-C18sE-IrhChVk5sOoIuxGmMGDub3So35WbxsWqDCL5805Xn33ycnE/exec';

// Inicializar cURL
$ch = curl_init($script_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Apenas para teste

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Definir o código de resposta HTTP
http_response_code($http_code);

// Enviar a resposta
echo $response;
?>
