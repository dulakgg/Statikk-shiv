<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class DeployToFtp extends Command
{
    protected $signature = 'deploy:ftp';
    protected $description = 'Deploy Laravel to FTP, preserve .env, upload build, and run composer install';

    public function handle()
    {
        // 1. Build frontend assets
        $this->info("▶ Running npm run build...");
        $process = Process::fromShellCommandline('npm run build', base_path());
        $process->setTimeout(300);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $this->info("✅ Build completed.");

        // 2. Set FTP credentials
        $ftpHost = config('ftp.host');
        $ftpUser = config('ftp.username');
        $ftpPass = config('ftp.password');

        $laravelRemote = 'public_html/laravel';
        $buildLocal = public_path('build');
        $buildRemote = 'public_html/build';

        $this->info("🔌 Connecting to FTP...");
        $conn = ftp_connect($ftpHost);
        if (!$conn) {
            $this->error("❌ Could not connect to FTP host.");
            return;
        }

        $login = ftp_login($conn, $ftpUser, $ftpPass);
        if (!$login) {
            $this->error("❌ Could not login to FTP server.");
            ftp_close($conn);
            return;
        }

        ftp_pasv($conn, true);

        // 3. Clean /public_html/laravel except .env
        $this->info("🧹 Cleaning /public_html/laravel (preserving .env)...");
        $files = ftp_nlist($conn, $laravelRemote);
        foreach ($files as $file) {
            if (basename($file) !== '.env') {
                $this->deleteRecursive($conn, $file);
            }
        }

        // 4. Upload Laravel app excluding unwanted dirs
        $this->info("📦 Uploading Laravel project...");
        $this->uploadDirectory($conn, base_path(), $laravelRemote, [
            'node_modules', 'vendor', '.git', 'tests', 'storage/logs', '.env'
        ]);

        // 5. Delete old build
        $this->info("🗑 Deleting old /public_html/build...");
        $this->deleteRecursive($conn, $buildRemote);

        // 6. Upload new build folder
        $this->info("🚀 Uploading new build to /public_html...");
        $this->uploadDirectory($conn, $buildLocal, $buildRemote);

        // 7. Trigger composer install remotely (if possible via shell_exec)
        $this->info("⚙ Running composer install on remote (optional, FTP cannot trigger shell commands).");
        $this->info("💡 NOTE: To run composer install remotely, you need SSH or a web hook.");

        ftp_close($conn);
        $this->info("✅ Deployment complete!");
    }

    private function deleteRecursive($conn, $path)
    {
        if (@ftp_delete($conn, $path)) return;

        $files = @ftp_nlist($conn, $path);
        if ($files !== false) {
            foreach ($files as $file) {
                $basename = basename($file);
                if ($basename === '.' || $basename === '..') continue;
                $this->deleteRecursive($conn, $file);
            }
        }
        @ftp_rmdir($conn, $path);
    }

    private function uploadDirectory($conn, $localDir, $remoteDir, $exclude = [])
    {
        if (!@ftp_chdir($conn, $remoteDir)) {
            @ftp_mkdir($conn, $remoteDir);
        }

        $items = scandir($localDir);
        foreach ($items as $item) {
            if (in_array($item, ['.', '..']) || in_array($item, $exclude)) continue;

            $localPath = $localDir . '/' . $item;
            $remotePath = $remoteDir . '/' . $item;

            if (is_dir($localPath)) {
                $this->uploadDirectory($conn, $localPath, $remotePath, $exclude);
            } else {
                ftp_put($conn, $remotePath, $localPath, FTP_BINARY);
            }
        }
    }
}
