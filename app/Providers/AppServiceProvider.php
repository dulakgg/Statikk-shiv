<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public function register(): void
    {

    }

    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verify Your Email')
                ->greeting('Hey ' . $notifiable->name . '!')
                ->line('You’re one step away from unlocking your personalized League of Legends stats dashboard.')
                ->line('Please verify your email address by clicking the button below to activate your account.')
                ->action('Verify Email Address', $url)
                ->line('This link will expire in 60 minutes.')
                ->line('Didn’t sign up for Statikk Shiv? No worries — you can safely ignore this email.')
                ->salutation('GLHF, The Statikk Shiv Team ⚡');
        });
    }
    

}
