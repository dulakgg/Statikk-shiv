<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 - Page Not Found</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Nunito', sans-serif;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
        }

        .container {
            max-width: 600px;
            padding: 2rem;
        }

        .error-code {
            font-size: 8rem;
            font-weight: 700;
            margin: 0;
            text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
        }

        .error-message {
            font-size: 1.5rem;
            margin: 1rem 0;
        }

        .home-button {
            display: inline-block;
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 50px;
            transition: transform 0.3s ease;
            font-weight: 700;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .home-button:hover {
            transform: translateY(-2px);
        }

        .animation {
            max-width: 300px;
            margin: 0 auto 2rem;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }

        .floating {
            animation: float 3s ease-in-out infinite;
        }

        @media (max-width: 768px) {
            .error-code {
                font-size: 6rem;
            }
            
            .error-message {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="animation">
            <svg class="floating" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200Z" fill="white" fill-opacity="0.1"/>
                <path d="M140 60L60 140" stroke="white" stroke-width="4" stroke-linecap="round"/>
                <path d="M60 60L140 140" stroke="white" stroke-width="4" stroke-linecap="round"/>
                <path d="M100 160C133.137 160 160 133.137 160 100C160 66.8629 133.137 40 100 40C66.8629 40 40 66.8629 40 100C40 133.137 66.8629 160 100 160Z" stroke="white" stroke-width="4"/>
            </svg>
        </div>
        
        <h1 class="error-code">419</h1>
        <p class="error-message">Your session has expired. Please refresh and try again.</p>
        <a href="{{ url('/') }}" class="home-button">Return to Homepage</a>
    </div>
</body>
</html>