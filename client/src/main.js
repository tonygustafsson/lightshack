import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        clicked: 0
    }
});

export default app;