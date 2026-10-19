# Fire Protection App

Laravel 11 + Inertia.js (React) application for fire station monitoring: devices, alerts, maps, and live notifications.

## Requirements

- PHP 8.2+
- Composer
- Node.js 18+ and npm
- MySQL

## Setup

```bash
# 1. Install dependencies
composer install
npm install

# 2. Environment
cp .env.example .env
php artisan key:generate

# 3. Configure MySQL in .env
# DB_DATABASE=fireprotection_app
# DB_USERNAME=root
# DB_PASSWORD=

# 4. Create the database, then migrate & seed
php artisan migrate
php artisan db:seed --class=SettingSeeder
php artisan db:seed --class=AdminUserSeeder

# Optional demo data (run in this order)
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=DeviceSeeder
php artisan db:seed --class=NotificationSeeder

# 5. Build frontend assets
npm run build
```

### Default admin login

| Field    | Value            |
|----------|------------------|
| Email    | `admin@test.com` |
| Password | `admin12345`     |

## Run locally

**All-in-one** (Laravel server + queue + Vite):

```bash
composer run dev
```

**Or separately:**

```bash
php artisan serve
npm run dev
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

> After changing any `VITE_*` value in `.env`, restart Vite (`npm run dev`) or rebuild (`npm run build`).

## External APIs

### Google Maps (required for maps & directions)

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable billing
3. Enable **Maps JavaScript API** and **Directions API**
4. Create an API key under [Credentials](https://console.cloud.google.com/google/maps-apis/credentials)
5. Set in `.env`:

```env
GOOGLE_MAPS_API_KEY=your_real_key
VITE_GOOGLE_MAPS_API_KEY="${GOOGLE_MAPS_API_KEY}"
```

For local testing, allow HTTP referrers:

- `http://127.0.0.1:8000/*`
- `http://localhost:8000/*`
- `http://localhost:5173/*`

### Pusher (required for live alerts)

1. Create an app at [pusher.com](https://pusher.com)
2. Set in `.env`:

```env
BROADCAST_CONNECTION=pusher
PUSHER_APP_ID=...
PUSHER_APP_KEY=...
PUSHER_APP_SECRET=...
PUSHER_APP_CLUSTER=ap1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

Without Pusher keys, the UI still loads; live fire alerts will not update in realtime.

## Device / notification API

Hardware or external clients can call:

| Method | Endpoint                     | Purpose              |
|--------|------------------------------|----------------------|
| POST   | `/api/devices/store`         | Register a device    |
| GET    | `/api/devices/index`         | List devices         |
| POST   | `/api/notifications/store`   | Create a fire alert  |
| GET    | `/api/directions`            | Google Directions    |

## Station settings

Map center uses the station latitude/longitude from **Admin → Settings**.  
If unset, the app defaults to Manila (`14.5995`, `120.9842`).

## Stack

- Laravel 11, Sanctum, Inertia.js
- React 18, Vite, Tailwind, CoreUI
- Google Maps (`@react-google-maps/api`)
- Laravel Echo + Pusher (realtime)

## License

MIT (Laravel skeleton base).
