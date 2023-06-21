<template>
    <div>
        <form autocomplete="off">
            <div class="login-form">
                <div class="form-heading">
                    <h1>Login Form</h1>
                </div>
                <!-- Car Add/Edit Form -->
                <div class="form">
                    <div class="row">
                        <label for="email">Email:</label>
                        <input type="email" v-model="email" id="email" @input="checkEmail" ref="email_ref">
                        <div v-show="error_msg_email" ref="email_error" class="error">{{ error_msg_email }}</div>
                    </div>
                    <div class="row row-password">
                        <label for="password">Password:</label>
                        <input type="password" v-model="password" id="password" @input="checkPassword" ref="password_ref">
                        <div v-show="error_msg_password" class="error">{{ error_msg_password }}</div>
                    </div>
                    <div class="row row-button">
                        <button @click.prevent="login()" class="submit">Login</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
const userStore = useUserStore()

const email = ref("")
const error_msg_email = ref("")
const email_ref = ref(null)
function checkEmail() {
    if (email.value === "") {
        const msg = "**Please enter valid email**"
        showError(error_msg_email, msg, email_ref)
        return false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            const msg = "**Please enter valid email**"

            showError(error_msg_email, msg, email_ref)
            return false;
        }
        clearError(error_msg_email)
        return true;
    }
}

const error_msg_password = ref("")
const password = ref("")
const password_ref = ref(null)
function checkPassword() {
    if (password.value === "") {
        const msg = "**Please enter password**"
        showError(error_msg_password, msg, password_ref)
        return false;
    } else {
        const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
        if (!passRegex.test(password.value)) {
            const msg = "**Password must be 8-12 characters, 1 number, 1 special character**"
            showError(error_msg_password, msg, password_ref)
            return false;
        }
        clearError(error_msg_password)
        return true;
    }
}

function login() {
    checkEmail(),
        checkPassword()
    if (checkEmail() && checkPassword()) {
        const data = getUserData()
        userStore.logInUser(data)
    }
}

function clearError(error) {
    error.value = "";
}

function getUserData() {
    return {
        email: email.value,
        password: password.value
    }
}

function showError(error, msg, ref) {
    error.value = msg,
        ref.value.focus()
}

</script>