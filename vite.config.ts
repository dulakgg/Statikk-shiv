import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx',
            ],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        ViteImageOptimizer({
            png: { quality: 75 },
            jpg: { quality: 75 },
            webp: { quality: 75 },
            svg: {
                multipass: true,
                plugins: [
                {
                    name: 'preset-default',
                    params: {
                    overrides: {
                        removeViewBox: false,
                    },
                    },
                },
                {
                    name: 'sortAttrs',
                },
                ],
            },
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
