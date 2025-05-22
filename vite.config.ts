import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
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
        visualizer(),
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
        treeShaking: true,
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    build: {
        target: 'esnext', // Use latest JS features for smaller bundles
        cssCodeSplit: true, // Split CSS per component/page
        minify: 'esbuild', // Use esbuild for faster/smaller minification
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    radix: [
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-menu',
                        '@radix-ui/react-tooltip'
                    ],
                    framer: ['framer-motion'],
                    axios: ['axios'],
                    floating: ['@floating-ui/react-dom', '@floating-ui/dom'],
                },
                chunkFileNames: 'chunks/[name]-[hash].js', // Better chunk caching
                entryFileNames: 'entry/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },
});
