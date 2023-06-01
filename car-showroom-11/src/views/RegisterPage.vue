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
                        <input type="text" v-model="name" ref="name_ref" @input="checkName">
                        <div v-show="error_msg_name" class="error">{{ error_msg_name }} </div>
                    </div>
                    <!-- Email -->
                    <div class="row">
                        <label>{{ $t('userForm.email') }} <span class="required-field">*</span></label>
                        <input type="email" v-model="email" ref="email_ref" @input="checkEmail">
                        <div v-show="error_msg_email" class="error">{{ error_msg_email }} </div>
                    </div>
                    <!-- Password -->
                    <div class="row">
                        <label>{{ $t('userForm.password') }} <span class="required-field">*</span></label>
                        <input type="password" v-model="password" ref="password_ref" @input="checkPassword">
                        <div v-show="error_msg_password" class="error">{{ error_msg_password }} </div>
                    </div>
                    <!-- Confirm Password -->
                    <div class="row">
                        <label>{{ $t('userForm.confirmpass') }} <span class="required-field">*</span></label>
                        <input type="password" v-model="confirmPassword" ref="confirmPassword_ref"
                            @input="checkConfirmPassword">
                        <div v-show="error_msg_confirmPassword" class="error">{{ error_msg_confirmPassword }} </div>
                    </div>
                    <!-- Role -->
                    <div class="row">
                        <label>{{ $t('userForm.role') }} <span class="required-field">*</span></label>
                        <select v-model="role" ref="role_ref" @change="checkRole">
                            <option value="Admin">{{ $t('userForm.admin') }}</option>
                            <option value="Employee">{{ $t('userForm.employee') }}</option>
                            <option value="Customer">{{ $t('userForm.customer') }}</option>
                        </select>
                        <div v-show="error_msg_role" class="error">{{ error_msg_role }} </div>
                    </div>
                    <!-- Gender -->
                    <div class="gender-class">
                        <div class="row-gender row ">
                            <label>{{ $t('userForm.gender') }} <span class="required-field">*</span></label>
                            <div class="gender">
                                <div class="male">
                                    <input type="radio" value="male" id="male" name="gender" v-model="gender"
                                        ref="gender_ref" @change="checkGender" />
                                    <label for="male">{{ $t('userForm.male') }}</label>
                                </div>
                                <div class="female">
                                    <input type="radio" value="female" id="female" name="gender" v-model="gender"
                                        ref="gender_ref" @change="checkGender" />
                                    <label for="female">{{ $t('userForm.female') }}</label>
                                </div>
                            </div>
                        </div>
                        <div v-if="error_msg_gender" class="error">{{ error_msg_gender }} </div>
                    </div>
                    <!-- Age -->
                    <div class="row">
                        <label>{{ $t('userForm.age') }} <span class="required-field">*</span></label>
                        <input type="number" v-model.number="age" ref="age_ref"
                            onkeydown="return (event.keyCode !== 107 && event.keyCode !== 109 && event.keyCode !== 69);"
                            @input="checkAge">
                        <!-- Prevent the user from pressing key : +,-,e -->
                        <div v-if="error_msg_age" class="error">{{ error_msg_age }}</div>
                    </div>
                    <!-- DOB -->
                    <div class="row">
                        <label>{{ $t('userForm.dob') }} <span class="required-field">*</span></label>
                        <input type="date" v-model="dob" ref="dob_ref" :max=formattedDate min="1923-12-31" @input="checkDOB"
                            onkeydown="return false;">
                        <div v-if="error_msg_dob" class="error">{{ error_msg_dob }}</div>
                    </div>
                    <div class="row row-button">
                        <button class="submit" @click.prevent="submit">{{ $t('userForm.register') }}</button>
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
import { useFormattedDate } from '../composables/useFormattedDate';

const { name, error_msg_name, name_ref, checkName,
    email, error_msg_email, email_ref, checkEmail,
    error_msg_password, password, password_ref, checkPassword,
    confirmPassword, error_msg_confirmPassword, confirmPassword_ref, checkConfirmPassword,
    role, error_msg_role, role_ref, checkRole,
    gender, error_msg_gender, gender_ref, checkGender,
    age, error_msg_age, age_ref, checkAge,
    dob, error_msg_dob, dob_ref, checkDOB } = useValidation()


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

