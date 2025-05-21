<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <!-- Preconnect and DNS Prefetch for external resources -->
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.bunny.net">
        <link rel="dns-prefetch" href="https://www.googletagmanager.com">
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">

        <!-- Preload main font for faster rendering -->
        <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap">

        <!-- Favicon with fetchpriority -->
        <link rel="icon" href="/favicon.svg" loading="lazy" type="image/svg+xml" fetchpriority="high">

        <!-- Google Analytics (GA4) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZZ1YPRM31G"></script>
        <script defer>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZZ1YPRM31G');
        </script>

        <!-- Google Tag Manager -->
        <script defer>
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KKGLRVDK');
        </script>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="keywords"
        content="League of Legends, LoL, gaming stats, LoL player stats, summoner profile lookup, EUNE rank tracker, match history LoL, champion builds 2025, ranked stats analytics, profile search tool" />

        <!-- Appearance Script (defer) -->
        <script defer>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';
                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>
        <style>
            html {
                background-color: oklch(1 0 0);
            }
            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" rel="stylesheet" />
        <title>Statikk Shiv – League of Legends Match History & Champion Stats Tracker</title>
        <meta name="description" content="Analyze your League of Legends matches, view player statistics, and discover insights with Statikk Shiv. Fast, modern, and privacy-friendly match history and champion stats." />
        <meta property="og:title" content="Statikk shiv" />
        <meta property="og:description" content="Statikk Shiv — your ultimate League of Legends stats hub with live match data, player rankings, and in-depth game analytics." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://statikkshiv.com/favicon.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Statikk shiv" />
        <meta name="twitter:description" content="Statikk Shiv — your ultimate League of Legends stats hub with live match data, player rankings, and in-depth game analytics." />
        <meta name="twitter:image" content="https://statikkshiv.com/favicon.png" />
        @routes
        <script defer>
            window.routes = {
              profileSearch: "{{ route('profile.search') }}"
            };
        </script>
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KKGLRVDK"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        @inertia
        <!-- Move ads script to after main content for better LCP -->
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7865510603035863"
        crossorigin="anonymous"></script>
    </body>
</html>
