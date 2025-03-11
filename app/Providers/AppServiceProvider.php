<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Observers\NotificationObserver;
use App\Observers\DeviceObserver;
use App\Observers\UserObserver;
use App\Models\Notification;
use App\Models\Device;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // if(env('APP_ENV') == 'local'){
        //     URL::forceScheme('https');  // ✅ Force HTTPS
        // }

        Notification::observe(NotificationObserver::class);
        Device::observe(DeviceObserver::class);
        User::observe(UserObserver::class);
        Vite::prefetch(concurrency: 3);

        
    }
}
