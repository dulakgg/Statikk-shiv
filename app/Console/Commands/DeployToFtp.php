<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class DeployToFtp extends Command
{
    protected $signature = 'deploy:ftp';
    protected $description = 'Deploy Laravel files and build folder to FTP, excluding node_modules, vendor, tests and .env';

    // Folders/files to exclude from upload in Laravel root
    protected $excluded = [
        'node_modules',
        'vendor',
        'tests',
        '.env',
        '.git',
        '.gitignore',
        '.gitattributes',
        '.DS_Store',
        'Thumbs.db',
    ];

    public function handle()
    {
        $ftpHost = config('ftp.host');
        $ftpUser = config('ftp.username');
        $ftpPass = config('ftp.password');

        if (!$ftpHost || !$ftpUser || !$ftpPass) {
            $this->error('FTP credentials not set.');
            return 1;
        }

        // 1. Run npm build inside laravel/public
        $this->info("🛠 Running npm run build...");
        $npmBuildPath = base_path('/public');

        $process = Process::fromShellCommandline('npm run build', $npmBuildPath);
        $process->setTimeout(300);
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });

        if (!$process->isSuccessful()) {
            $this->error('❌ npm run build failed.');
            return 1;
        }

        $localBuildDir = $npmBuildPath . DIRECTORY_SEPARATOR . 'build';
        if (!is_dir($localBuildDir)) {
            $this->error("❌ Build folder not found at: $localBuildDir");
            return 1;
        }
        $this->info("✅ npm build finished.");

        // 2. Connect to FTP
        $this->info("🔌 Connecting to FTP...");
        $conn = ftp_connect($ftpHost);
        if (!$conn) {
            $this->error("❌ Could not connect to FTP host.");
            return 1;
        }
        if (!ftp_login($conn, $ftpUser, $ftpPass)) {
            $this->error("❌ Could not login to FTP.");
            ftp_close($conn);
            return 1;
        }
        ftp_pasv($conn, true);

        // 3. Delete all files/folders in remote /laravel except .env
        $remoteLaravelDir = 'laravel'; // Adjust if your remote path is different

        $this->info("🗑 Deleting all files/folders in /$remoteLaravelDir except .env...");
        $this->deleteRemoteFolderContents($conn, $remoteLaravelDir);

        // 4. Upload Laravel files/folders except excluded and .env
        $localLaravelDir = base_path();
        $this->info("📤 Uploading Laravel files (excluding node_modules, vendor, tests, .env)...");
        $this->uploadLaravelFiles($conn, $localLaravelDir, $remoteLaravelDir);

        // 5. Delete old remote build folder first (/public_html/build)
        $remoteBuildDir = 'build'; // Assuming FTP root is /public_html

        $this->info("🗑 Deleting old /public_html/$remoteBuildDir...");
        $this->deleteRecursive($conn, $remoteBuildDir);

        // 6. Upload build folder from laravel/public/build to /public_html/build
        $this->info("🚀 Uploading build folder to /public_html/$remoteBuildDir...");
        $this->uploadDirectory($conn, $localBuildDir, $remoteBuildDir);

        ftp_close($conn);
        $this->info("✅ Deployment complete!");
        return 0;
    }

    private function deleteRemoteFolderContents($conn, $remoteDir)
    {
        $files = @ftp_nlist($conn, $remoteDir);
        if ($files === false) {
            $this->info("No files found in $remoteDir to delete.");
            return;
        }

        foreach ($files as $file) {
            $basename = basename($file);
            if ($basename == '.' || $basename == '..' || $basename == '') continue;

            // Skip deleting .env file
            if ($basename === '.env') {
                $this->info("Skipping deletion of .env file");
                continue;
            }

            $remotePath = $remoteDir . '/' . $basename;

            $this->deleteRecursive($conn, $remotePath);
        }
    }

    private function deleteRecursive($conn, $path)
    {
        // Try to delete as file
        if (@ftp_delete($conn, $path)) {
            $this->info("Deleted file: $path");
            return;
        }

        // Try as directory
        $files = @ftp_nlist($conn, $path);
        if ($files !== false) {
            foreach ($files as $file) {
                $basename = basename($file);
                if ($basename == '.' || $basename == '..') continue;
                $this->deleteRecursive($conn, $file);
            }
        }

        if (@ftp_rmdir($conn, $path)) {
            $this->info("Deleted directory: $path");
        } else {
            $this->error("Failed to delete: $path");
        }
    }

    private function uploadLaravelFiles($conn, $localDir, $remoteDir)
    {
        @ftp_mkdir($conn, $remoteDir);

        $files = scandir($localDir);
        foreach ($files as $file) {
            if ($file == '.' || $file == '..') continue;

            // Skip excluded folders/files
            if (in_array($file, $this->excluded)) {
                $this->info("Skipping excluded: $file");
                continue;
            }

            $localPath = $localDir . DIRECTORY_SEPARATOR . $file;
            $remotePath = $remoteDir . '/' . $file;

            if (is_dir($localPath)) {
                $this->uploadLaravelFiles($conn, $localPath, $remotePath);
            } else {
                // Also skip .env to preserve remote .env
                if ($file === '.env') {
                    $this->info("Preserving remote .env file, skipping upload.");
                    continue;
                }

                $upload = ftp_put($conn, $remotePath, $localPath, FTP_BINARY);
                if ($upload) {
                    $this->info("Uploaded file: $remotePath");
                } else {
                    $this->error("Failed to upload file: $remotePath");
                }
            }
        }
    }

    private function uploadDirectory($conn, $localDir, $remoteDir)
    {
        @ftp_mkdir($conn, $remoteDir);

        $files = scandir($localDir);
        foreach ($files as $file) {
            if ($file == '.' || $file == '..') continue;

            $localPath = $localDir . DIRECTORY_SEPARATOR . $file;
            $remotePath = $remoteDir . '/' . $file;

            if (is_dir($localPath)) {
                $this->uploadDirectory($conn, $localPath, $remotePath);
            } else {
                $upload = ftp_put($conn, $remotePath, $localPath, FTP_BINARY);
                if ($upload) {
                    $this->info("Uploaded build file: $remotePath");
                } else {
                    $this->error("Failed to upload build file: $remotePath");
                }
            }
        }
    }
}
