<template>
    <div>
        <form autocomplete="off">
            <div class="login-form">
                <div class="form-heading">
                    <h1>{{ $t('userForm.login-form') }}</h1>
                </div>
                <!-- Car Add/Edit Form -->
                <div class="form">
                    <div class="row">
                        <label for="email">{{ $t('userForm.email') }} <span class="required-field">*</span></label>
                        <input type="email" v-model="email" id="email" @input="checkEmail" ref="emailRef">
                        <div v-show="errorMsgEmail" class="error">{{ errorMsgEmail }}</div>
                    </div>
                    <div class="row row-password">
                        <label for="password">{{ $t('userForm.password') }} <span class="required-field">*</span></label>
                        <input type="password" v-model="password" id="password" @input="checkPassword" ref="passwordRef">
                        <div v-show="errorMsgPassword" class="error">{{ errorMsgPassword }}</div>
                    </div>
                    <div class="row row-button">
                        <button @click.prevent="login()" class="submit">{{ $t('userForm.login') }}</button>
                    </div>
                    <div class="login-register-link">
                        <div>{{ $t('userForm.notMember') }} ? <RouterLink :to="{ name: 'Register' }">{{
                            $t('userForm.regHere') }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
import { useValidation } from '../composables/useValidation';

const { email, errorMsgEmail, emailRef, checkEmail,
    errorMsgPassword, password, passwordRef, checkPassword } = useValidation()


function login() {
    checkEmail()
    checkPassword()
    if (checkEmail() && checkPassword()) {
        const data = getUserData()
        userStore.logInUser(data)
    }
}
function getUserData() {
    return {
        email: email.value,
        password: password.value
    }
}

</script>