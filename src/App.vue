<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <index-page/>
    </div>
</template>

<script>

    import IndexPage from "./pages/index/IndexPage";

    export default {
        name: 'app',
        components: {
            IndexPage,
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
