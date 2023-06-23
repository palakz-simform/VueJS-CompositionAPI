<template>
    <div>
        <form>
            <div class="login-form">
                <div class="form-heading">
                    <h1>{{ $t('userForm.register-form') }}</h1>
                </div>
                <!-- Car Add/Edit Form -->

                <div class="form">
                    <!-- Name -->
                    <div class="row">
                        <label>{{ $t('userForm.name') }} <span class="required-field">*</span></label>
                        <input type="text" v-model="name" ref="nameRef" @input="checkName">
                        <div v-show="errorMsgName" class="error">{{ errorMsgName }} </div>
                    </div>
                    <!-- Email -->
                    <div class="row">
                        <label>{{ $t('userForm.email') }} <span class="required-field">*</span></label>
                        <input type="email" v-model="email" ref="emailRef" @input="checkEmail">
                        <div v-show="errorMsgEmail" class="error">{{ errorMsgEmail }} </div>
                    </div>
                    <!-- Password -->
                    <div class="row">
                        <label>{{ $t('userForm.password') }} <span class="required-field">*</span></label>
                        <input type="password" v-model="password" ref="passwordRef" @input="checkPassword">
                        <div v-show="errorMsgPassword" class="error">{{ errorMsgPassword }} </div>
                    </div>
                    <!-- Confirm Password -->
                    <div class="row">
                        <label>{{ $t('userForm.confirmpass') }} <span class="required-field">*</span></label>
                        <input type="password" v-model="confirmPassword" ref="confirmPasswordRef"
                            @input="checkConfirmPassword">
                        <div v-show="errorMsgConfirmPassword" class="error">{{ errorMsgConfirmPassword }} </div>
                    </div>
                    <!-- Role -->
                    <div class="row">
                        <label>{{ $t('userForm.role') }} <span class="required-field">*</span></label>
                        <select v-model="role" ref="roleRef" @change="checkRole">
                            <option value="Admin">{{ $t('userForm.admin') }}</option>
                            <option value="Employee">{{ $t('userForm.employee') }}</option>
                            <option value="Customer">{{ $t('userForm.customer') }}</option>
                        </select>
                        <div v-show="errorMsgRole" class="error">{{ errorMsgRole }} </div>
                    </div>
                    <!-- Gender -->
                    <div class="gender-class">
                        <div class="row-gender row ">
                            <label>{{ $t('userForm.gender') }} <span class="required-field">*</span></label>
                            <div class="gender">
                                <div class="male">
                                    <input type="radio" value="male" id="male" name="gender" v-model="gender"
                                        ref="genderRef" @change="checkGender" />
                                    <label for="male">{{ $t('userForm.male') }}</label>
                                </div>
                                <div class="female">
                                    <input type="radio" value="female" id="female" name="gender" v-model="gender"
                                        ref="genderRef" @change="checkGender" />
                                    <label for="female">{{ $t('userForm.female') }}</label>
                                </div>
                            </div>
                        </div>
                        <div v-if="errorMsgGender" class="error">{{ errorMsgGender }} </div>
                    </div>
                    <!-- Age -->
                    <div class="row">
                        <label>{{ $t('userForm.age') }} <span class="required-field">*</span></label>
                        <input type="number" v-model.number="age" ref="ageref"
                            onkeydown="return (event.keyCode !== 107 && event.keyCode !== 109 && event.keyCode !== 69);"
                            @input="checkAge">
                        <!-- Prevent the user from pressing key : +,-,e -->
                        <div v-if="errorMsgAge" class="error">{{ errorMsgAge }}</div>
                    </div>
                    <!-- DOB -->
                    <div class="row">
                        <label>{{ $t('userForm.dob') }} <span class="required-field">*</span></label>
                        <input type="date" v-model="dob" ref="dobRef" :max=formattedDate min="1923-12-31" @input="checkDOB"
                            onkeydown="return false;">
                        <div v-if="errorMsgDob" class="error">{{ errorMsgDob }}</div>
                    </div>
                    <div class="row row-button">
                        <button class="submit" @click.prevent="submit">{{ $t('userForm.register') }}</button>
                    </div>
                    <div class="login-register-link">
                        <div>{{ $t('userForm.alreadyMember') }} ? <RouterLink :to="{ name: 'Login' }">{{
                            $t('userForm.loginHere') }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
import { useValidation } from '@/composables/useValidation';
import { useFormattedDate } from '@/composables/useFormattedDate';

const { name, errorMsgName, nameRef, checkName,
    email, errorMsgEmail, emailRef, checkEmail,
    errorMsgPassword, password, passwordRef, checkPassword,
    confirmPassword, errorMsgConfirmPassword, confirmPasswordRef, checkConfirmPassword,
    role, errorMsgRole, roleRef, checkRole,
    gender, errorMsgGender, genderRef, checkGender,
    age, errorMsgAge, ageref, checkAge,
    dob, errorMsgDob, dobRef, checkDOB } = useValidation()


function submit() {
    checkName(), checkEmail(), checkPassword(), checkConfirmPassword(), checkRole(), checkGender(), checkAge(), checkDOB()
    if (checkName() && checkEmail() && checkPassword() && checkConfirmPassword() && checkRole() && checkGender() && checkAge() && checkDOB()) {
        const data = {
            name: name.value,
            email: email.value,
            role: role.value,
            password: password.value,
            age: age.value,
            dob: dob.value,
            gender: gender.value
        }
        userStore.registerUser(data)
    }
}
const { formattedDate } = useFormattedDate()
</script>

