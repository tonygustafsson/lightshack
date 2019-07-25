<script>
    import { onMount } from 'svelte';
    import PouchDB from 'pouchdb-browser';

    let sites = [];
    let isLoading = true;

    let localDb = new PouchDB('db');
    let remoteDb = new PouchDB('http://localhost:5984/lightshack');

    localDb.replicate
        .from(remoteDb, {
            live: true,
            retry: true
        })
        .on('change', async function(info) {
            console.log('Updating with new data');
            await update();
        })
        .on('error', function(err) {
            console.log('Replication error:', err);
        });

    export let clicked;

    let handleClick = () => {
        clicked++;
    };

    async function update() {
        const allDocs = await localDb.allDocs({
            include_docs: true
        });
        sites = allDocs.rows.map(row => row.doc);
        isLoading = false;
    }

    onMount(async () => {
        await update();
    });
</script>

<style>
    .app {
        background: black;
        color: white;
        user-select: none;
    }
    h1 {
        color: red;
    }
</style>

<body class="app" on:click={handleClick}>
    <h1>LightShack</h1>

    <p>Clicked {clicked} times.</p>

    <ul>
        {#each sites as site (site._id)}
            <li>{site.url}: {site.speedIndex}</li>
        {/each}
    </ul>
</body>
