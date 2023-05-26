<template>
    <div class="title">
        <div class="nav">
            <div>
                <RouterLink :to="{ name: 'home' }" class="nav-heading">
                    <img src="../assets/car-logo.png" alt="logo" />
                    <h1 class="logo-name">Car Gallery</h1>
                </RouterLink>
            </div>
            <div>
                <span v-if="userStore.login == 'true'">
                    <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
                    <a class="link" @click="userStore.logout">Logout</a>
                    <span v-if="userStore.role == 'admin'">
                        <RouterLink class="link" :to="{ name: 'users' }">Users</RouterLink>
                    </span>
                </span>
                <template v-else>
                    <RouterLink class="link" :to="{ name: 'login' }">Login</RouterLink>
                    <RouterLink class="link link-register" :to="{ name: 'register' }">Register</RouterLink>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
const userStore = useUserStore()
const role = ref(localStorage.getItem('role'))
</script>

<style >
body {
    margin: 0px;
}

.title {
    text-align: center;
}

.nav-heading {
    display: flex;
}

.nav img {
    height: 60px;
    width: auto;
    margin-left: 30px;
    margin-top: 3px;
}

.logo-name {
    color: rgb(255, 255, 255);
    font-size: 25px;
    text-shadow: 0 0 3px gray;
    margin-left: 10px;
    margin-top: 22px;
}

.nav {
    height: 70px;
    background-color: rgb(0, 0, 0);
    padding-right: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    box-shadow: 0px 1px 30px 1px rgba(255, 255, 255, 0.75);
}

.link {
    margin-right: 70px;
    color: rgb(255, 255, 255);
    font-size: 18px;
    font-weight: bold;
    width: 60px;
    text-decoration: none;
}

a.router-link-exact-active {
    color: rgb(35, 177, 172);
}

.link:hover {
    color: rgb(35, 177, 172);
    cursor: pointer;
}

a {
    text-decoration: none;
}

@media (max-width: 750px) {
    .title h1 {
        margin-left: 20px;
    }

    .link {
        margin-right: 20px;
        font-size: 15px;
    }

    .link-register {
        margin-right: 0px;
    }

    .nav {
        padding-right: 10px;
    }

    a.router-link-exact-active {
        font-size: 18px;
    }
}

@media (max-width: 600px) {
    .nav img {
        margin-left: 15px;
    }

    .logo-name {
        display: none;
    }
}
</style>