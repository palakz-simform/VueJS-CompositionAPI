<template>
    <div class="not-found">
        <h1>{{ $t('notFound.msg') }}</h1>
        <p>{{ $t('notFound.please') }} <RouterLink :to="{ name: 'home' }"> <span>{{ $t('notFound.click') }}</span>
            </RouterLink>
            {{ $t('notFound.msg_home') }}</p>
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
