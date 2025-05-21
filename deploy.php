<?php

// --- Config ---
$expectedToken = getenv('FTP_DEPLOY_TOKEN'); 

// --- Ensure HTTPS ---
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
    http_response_code(403);
    exit('HTTPS required');
}

// --- Only allow POST ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

// --- Verify token ---
$token = $_POST['token'] ?? '';
if ($token !== $expectedToken) {
    http_response_code(403);
    exit('Invalid token');
}

// --- Run composer install ---
chdir(__DIR__); // Assumes this file is in the /laravel directory
header('Content-Type: text/plain; charset=utf-8');
passthru('composer install --no-dev --optimize-autoloader 2>&1');
echo "\n\n";
// Run view:cache with php83-cli
passthru('php83-cli artisan view:cache 2>&1');
echo "\n\n";
// Run event:cache with php83-cli
passthru('php83-cli artisan event:cache 2>&1');
echo "\n\n";
// Run route:cache with php83-cli
passthru('php83-cli artisan route:cache 2>&1');
