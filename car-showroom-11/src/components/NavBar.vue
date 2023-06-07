<template>
    <div class="title">
        <div class="nav">
            <div>
                <RouterLink :to="{ name: 'home' }" class="nav-heading">
                    <img src="../assets/car-logo.png" alt="logo" />
                    <h1 class="logo-name">{{ $t("nav.app-name") }}</h1>
                </RouterLink>
            </div>
            <div>
                <span v-if="userStore.login == 'true'">
                    <RouterLink class="link" :to="{ name: 'home' }">{{ $t('nav.home') }}</RouterLink>
                    <span v-if="formattedString(userStore.role) == 'Admin'">
                        <RouterLink class="link" :to="{ name: 'users' }">{{ $t('nav.users') }}</RouterLink>
                    </span>
                    <a class="link" @click="userStore.logout">{{ $t('nav.logout') }}</a>
                </span>
                <template v-else>
                    <RouterLink class="link" :to="{ name: 'login' }">{{ $t('userForm.login') }}</RouterLink>
                    <RouterLink class="link link-register" :to="{ name: 'register' }">{{ $t('userForm.register') }}
                    </RouterLink>
                </template>
                <span>
                    <select id="locale-select" v-model="$i18n.locale">
                        <option value="en">English</option>
                        <option value="hi">हिंदी</option>
                        <option value="fr">Français</option>
                        <option value="ja">日本</option>
                    </select>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
const userStore = useUserStore()
import { useCapitalize } from '../composables/useCapitalize'
const { formattedString } = useCapitalize()
</script>

<style>
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

#locale-select {
    margin: 0 0 0 0;
    width: 80px;
    height: 30px;
    background-color: black;
    color: white;
    border: 1px solid rgb(35, 177, 172);
    font-weight: bold;
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
        margin-right: 20px;
    }

    .nav {
        padding-right: 10px;
    }
}

@media (max-width: 600px) {
    .nav img {
        margin-left: 15px;
    }

    .logo-name {
        display: none;
    }

    #locale-select {
        width: 80px;
        height: 25px;
        font-size: 13px;
        font-weight: bold;
    }
}

@media (max-width: 420px) {
    .nav img {
        height: 40px;
        margin-left: 10px;
        border: none;
    }

    .link {
        margin-right: 10px;
        font-size: 15px;
    }

}
</style>