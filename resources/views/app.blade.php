<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="League of Legends, LoL, gaming stats, LoL player stats, summoner profile lookup, EUNE rank tracker, match history LoL, champion builds 2025, ranked stats analytics, profile search tool">
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.bunny.net">
    <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
    <noscript>
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" rel="stylesheet">
    </noscript>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" fetchpriority="high">
    <title>Statikk Shiv – LoL Match History & Stats Tracker</title>
    <meta name="description" content="Analyze your League of Legends matches, view player statistics, and discover insights with Statikk Shiv. Fast, modern, and privacy-friendly match history and champion stats.">
    <meta property="og:title" content="Statikk shiv">
    <meta property="og:description" content="Statikk Shiv — your ultimate League of Legends stats hub with live match data, player rankings, and in-depth game analytics.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://statikkshiv.com/favicon.svg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Statikk shiv">
    <meta name="twitter:description" content="Statikk Shiv — your ultimate League of Legends stats hub with live match data, player rankings, and in-depth game analytics.">
    <meta name="twitter:image" content="https://statikkshiv.com/favicon.png">
    <style>
        html { background-color: #fff; }
        html.dark { background-color: #18181b; }
    </style>
    <script>
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
    @routes
    <script>
        window.routes = {
            profileSearch: "{{ route('profile.search') }}"
        };
    </script>
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    <main>
        <div style="display:none;">
            <p>Your ultimate League of Legends stats hub. Track matches, view player rankings, and analyze your gameplay with fast, modern, and privacy-friendly tools.</p>
            Statikk Shiv is a comprehensive League of Legends statistics and analytics platform. We provide detailed match history, player performance breakdowns, champion build guides, and up-to-date rankings for all regions. Whether you’re a casual player or a competitive gamer, our tools help you track your progress, analyze your gameplay, and improve your skills. Enjoy privacy-friendly, fast, and modern features designed for the League community. Explore summoner profiles, discover meta trends, and stay ahead in your ranked journey with Statikk Shiv.
        </div>
        <div style="display:none;">
            Statikk Shiv empowers League of Legends players with advanced analytics, real-time match tracking, and personalized performance insights. Our platform aggregates data from all regions, offering meta analysis, champion statistics, and player comparisons. With privacy at the core, Statikk Shiv never shares your data and ensures a seamless, ad-light experience. Whether you want to climb the ranked ladder, optimize your champion pool, or simply review your match history, Statikk Shiv provides the tools and resources you need. Join thousands of summoners who trust Statikk Shiv for their League of Legends journey.
        </div>
        <div style="display:none;">
            League of Legends stats, match history, champion builds, meta analysis, ranked ladder, summoner lookup, EUNE, EUW, NA, KR, OCE, LAN, LAS, BR, TR, RU, JP, LoL analytics, performance breakdowns, privacy-first gaming tools, ad-light experience, champion pool optimization, real-time match tracking, player comparisons, summoner profiles, champion statistics, League of Legends guides, LoL esports, ranked stats, match analysis, League meta, champion win rates, best builds, player rankings, competitive gaming, LoL tracker, LoL match data, League of Legends performance, LoL match review, League of Legends improvement, Statikk Shiv LoL, Statikk Shiv analytics, Statikk Shiv stats, Statikk Shiv match history, Statikk Shiv champion builds, Statikk Shiv meta, Statikk Shiv ranked, Statikk Shiv summoner, Statikk Shiv player stats, Statikk Shiv guides, Statikk Shiv privacy, Statikk Shiv fast, Statikk Shiv modern, Statikk Shiv community.
        </div>
        <div style="display:none;">
            <h2>League of Legends Analytics, Stats, and Match History</h2>
            <p>
                Statikk Shiv is your trusted source for League of Legends analytics, providing in-depth champion statistics, match history, and player rankings for all regions including NA, EUW, EUNE, KR, OCE, LAN, LAS, BR, TR, RU, and JP. Our platform delivers real-time match tracking, meta analysis, and champion build guides to help you climb the ranked ladder and optimize your champion pool. Whether you're searching for the best builds, champion win rates, or competitive gaming insights, Statikk Shiv offers privacy-first, ad-light, and modern tools for every summoner.
            </p>
            <p>
                Discover advanced League of Legends stats, including KDA, win rates, pick rates, ban rates, and performance breakdowns for every champion. Use our summoner lookup to find player profiles, review match data, and compare your stats with top players. Statikk Shiv supports esports enthusiasts with live match data, ranked stats, and meta trends, making it the go-to hub for LoL analytics and improvement. Our guides and resources are designed for both casual and competitive players seeking to enhance their gameplay and climb the ranked ladder.
            </p>
            <p>
                Statikk Shiv's features include: champion builds, meta analysis, match history, summoner lookup, player comparisons, champion statistics, League of Legends guides, LoL esports coverage, ranked stats, match analysis, League meta, champion win rates, best builds, player rankings, competitive gaming tools, LoL tracker, LoL match data, League of Legends performance analytics, LoL match review, League of Legends improvement, Statikk Shiv LoL analytics, Statikk Shiv stats, Statikk Shiv match history, Statikk Shiv champion builds, Statikk Shiv meta, Statikk Shiv ranked, Statikk Shiv summoner, Statikk Shiv player stats, Statikk Shiv guides, Statikk Shiv privacy, Statikk Shiv fast, Statikk Shiv modern, Statikk Shiv community.
            </p>
            <ul>
                <li>League of Legends champion builds, runes, and counters</li>
                <li>Live match data and real-time ranked stats</li>
                <li>Summoner profile lookup and player comparisons</li>
                <li>Meta analysis and champion tier lists</li>
                <li>Performance breakdowns and improvement tools</li>
                <li>Privacy-first, ad-light, and fast analytics experience</li>
                <li>Comprehensive guides for all roles and champions</li>
                <li>LoL esports stats, pro builds, and tournament data</li>
                <li>Best builds, win rates, and pick rates for every patch</li>
                <li>Community-driven insights and modern design</li>
            </ul>
            <p>
                Statikk Shiv is dedicated to providing the most accurate and up-to-date League of Legends data. Our mission is to empower players with the knowledge and tools needed to succeed in ranked games, improve their skills, and enjoy a seamless, privacy-focused experience. Join thousands of summoners who trust Statikk Shiv for their League of Legends journey and stay ahead of the meta with our advanced analytics platform.
            </p>
            <p>
                Keywords: League of Legends stats, LoL analytics, match history, champion builds, meta analysis, ranked ladder, summoner lookup, EUNE, EUW, NA, KR, OCE, LAN, LAS, BR, TR, RU, JP, performance breakdowns, privacy-first gaming tools, ad-light experience, champion pool optimization, real-time match tracking, player comparisons, summoner profiles, champion statistics, League of Legends guides, LoL esports, ranked stats, match analysis, League meta, champion win rates, best builds, player rankings, competitive gaming, LoL tracker, LoL match data, League of Legends performance, LoL match review, League of Legends improvement, Statikk Shiv LoL, Statikk Shiv analytics, Statikk Shiv stats, Statikk Shiv match history, Statikk Shiv champion builds, Statikk Shiv meta, Statikk Shiv ranked, Statikk Shiv summoner, Statikk Shiv player stats, Statikk Shiv guides, Statikk Shiv privacy, Statikk Shiv fast, Statikk Shiv modern, Statikk Shiv community.
            </p>
            <p>
                Statikk Shiv is not affiliated with Riot Games or League of Legends. All trademarks and copyrights belong to their respective owners. Use Statikk Shiv to enhance your League of Legends experience with reliable, fast, and privacy-focused analytics.
            </p>
            <p>
                Looking for the best League of Legends stats site? Statikk Shiv is your answer for match history, champion builds, meta analysis, and more. Track your ranked progress, optimize your champion pool, and compare your stats with the best players in the world. Statikk Shiv – the ultimate League of Legends analytics platform.
            </p>
        </div>
        @inertia
    </main>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZZ1YPRM31G"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ZZ1YPRM31G');
    </script>
</body>
</html>