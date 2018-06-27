import init from '@/init';

window.onload = () => {
    const app = init();
    app.start();
};

// prevent accidentally closing the app, warn user before exit if changes were made
window.addEventListener('beforeunload', (e) => {
    (e || window.event).returnValue = true;
    return true;
});
