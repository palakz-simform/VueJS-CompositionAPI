<template>
    <div>
        <form autocomplete="off">
            <div class="login-form">
                <div class="heading">
                    <h1>Login Form</h1>
                </div>
                <!-- Car Add/Edit Form -->

                <div class="form">
                    <div class="row">
                        <label for="email">Email:</label>
                        <input type="email" v-model="email" id="email" ref="email" @input="checkEmail">
                        <div v-show="error_msg_email" class="error">{{ error_msg_email }}</div>
                    </div>
                    <div class="row row-password">
                        <label for="password">Password:</label>
                        <input type="password" v-model="password" id="password" ref="password" @input="checkPassword">
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

<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
    name: 'LoginPage',
    data() {
        return {
            error_msg_email: "",
            error_msg_password: "",
            email: "",
            password: "",
        }
    },
    methods: {
        ...mapActions(useUserStore, ['logInUser']),
        clearError(error) {
            this[`error_msg_${error}`] = "";
        },
        getUserData() {
            return {
                email: this.email,
                password: this.password
            }
        },
        login() {
            this.checkEmail(),
                this.checkPassword()
            if (this.checkEmail() && this.checkPassword()) {
                const data = this.getUserData()
                this.logInUser(data)
            }
        },
        checkEmail() {
            if (this.email === "") {
                const msg = "**Please enter email**"
                this.showError("email", msg)
                return false;
            } else if (this.email !== "") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                    const msg = "**Please enter valid email**"
                    this.showError("email", msg)
                    return false;
                }
                this.clearError("email")
                return true;
            }
            this.clearError("email")
            return true;
        },
        checkPassword() {
            if (this.password === "") {
                const msg = "**Please enter password**"
                this.showError("password", msg)
                return false;
            } else if (this.password !== "") {
                const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
                if (!passRegex.test(this.password)) {
                    const msg = "**Password must be 8-12 characters, 1 number, 1 special character**"
                    this.showError("password", msg)
                    return false;
                }
                this.clearError("password")
                return true
            }
            this.clearError("password")
            return true
        },
        showError(error, msg) {
            this[`error_msg_${error}`] = msg;
            this.$refs[error].focus();
        }

    }
}
</script>

<style src="../../public/style.css" scoped></style>
