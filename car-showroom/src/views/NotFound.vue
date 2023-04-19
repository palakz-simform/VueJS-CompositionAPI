<template>
    <div class="not-found">
        <h1>Page Not Found!!</h1>
        <p>Please <RouterLink :to="{ name: 'home' }"> <span>click</span> </RouterLink> here to access the home page</p>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 150px;
}

h1 {
    color: rgb(35, 177, 172);
}

p {
    font-size: 20px;
    color: white;
}

span {
    color: rgb(35, 177, 172);
    text-decoration: underline;
    cursor: pointer;
}
</style>
