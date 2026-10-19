import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const key = import.meta.env.VITE_PUSHER_APP_KEY;
const cluster = import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1';

let echo;

if (key) {
    echo = new Echo({
        broadcaster: 'pusher',
        key,
        cluster,
        forceTLS: true,
    });
} else {
    console.warn(
        'Pusher app key missing. Set VITE_PUSHER_APP_KEY (and VITE_PUSHER_APP_CLUSTER) in .env, then rebuild assets.'
    );

    // No-op stub so pages that listen for notifications still load without Pusher.
    const channel = {
        listen: () => channel,
        stopListening: () => channel,
    };

    echo = {
        channel: () => channel,
        private: () => channel,
        leaveChannel: () => {},
        leave: () => {},
        disconnect: () => {},
    };
}

export default echo;
