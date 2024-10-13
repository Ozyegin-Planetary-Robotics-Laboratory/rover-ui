import { createApp } from 'vue';
import App from './App.vue'; // Ensure this path is correct
import router from './router'; // Import the router

// Create the Vue application instance
const app = createApp(App);

// Use the router
app.use(router);

// Mount the app to the DOM
app.mount('#app');
