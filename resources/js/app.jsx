import '../css/app.scss';
import './bootstrap';

import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/icons/css/all.min.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

// Import Redux
import { Provider } from 'react-redux';
import store from './Includes/store'; // Import your Redux store

const configuredAppName = import.meta.env.VITE_APP_NAME;
const appName =
    configuredAppName && configuredAppName !== 'Laravel'
        ? configuredAppName
        : 'Fire Station Management System';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={store}>  
                <App {...props} />
            </Provider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
