<template>
    <div class="not_found">
        <h1>Oups... </h1>
        <p>Il semble qu'un problème est survenu... Veuillez réessayer ultérieurement</p>
        <router-link class="link" to='/'>Retourner sur la page d'accueil</router-link>
    </div>
</template>

<style scoped>
.link {
    color: black;
}
.link:hover {
    color: rgb(255, 57, 57);
}
.not_found {
    background-color: white;
}
</style>