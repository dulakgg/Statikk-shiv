<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Search Results</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fc;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        h1 {
            text-align: center;
            color: #2e3b4e;
        }
        .profile-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 20px;
        }
        .profile-info p {
            font-size: 18px;
            margin: 5px 0;
        }
        .profile-info img {
            border-radius: 50%;
            margin-top: 10px;
            width: 100px;
            height: 100px;
        }
        h2 {
            color: #2e3b4e;
            margin-top: 30px;
        }
        .match {
            background-color: #f8f9fc;
            border: 1px solid #ddd;
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 8px;
        }
        .match h3 {
            color: #1e2b45;
            margin-bottom: 10px;
        }
        .match p {
            margin: 5px 0;
            font-size: 16px;
        }
        .match ul {
            list-style-type: none;
            padding: 0;
        }
        .match ul li {
            font-size: 16px;
            color: #555;
            margin: 3px 0;
        }
        .match ul li span {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Profile Search Results</h1>
        
        <div class="profile-info">
            <p><strong>Nickname:</strong> {{ $nickname }}</p>
            <p><strong>Tagline:</strong> {{ $tagline }}</p>
            <p><strong>Region:</strong> {{ $region }}</p>
            <p><strong>PUUID:</strong> {{ $puuid }}</p>
            <p><strong>Summoner ID:</strong> {{ $id }}</p>
            <p><strong>Account ID:</strong> {{ $accountId }}</p>
            <p><strong>Summoner Level:</strong> {{ $summonerLevel }}</p>
            <p><strong>Last Updated:</strong> {{ $revisionDate }}</p>
            <img src="https://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/{{ $profileIconId }}.png" alt="Profile Icon">
        </div>

        <h2>Last 20 Matches</h2>

        @foreach($matches as $match)
            <div class="match">
                <h3>Game ID: {{ $match['metadata']['matchId'] }}</h3>
                <p><strong>Game Duration:</strong> {{ gmdate('H:i:s', $match['info']['gameDuration']) }}</p>
                <p><strong>Game Mode:</strong> {{ $match['info']['gameMode'] }}</p>
                <p><strong>Participants:</strong></p>
                <ul>
                    @foreach($match['info']['participants'] as $participant)
                        <li>{{ $participant['summonerName'] }} <span>({{ $participant['kills'] }}/{{ $participant['deaths'] }}/{{ $participant['assists'] }})</span></li>
                    @endforeach
                </ul>
            </div>
        @endforeach
    </div>
</body>
</html>
