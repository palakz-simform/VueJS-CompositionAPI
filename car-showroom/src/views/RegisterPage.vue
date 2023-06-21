<template>
    <div>
        <form>
            <div class="login-form">
                <div class="form-heading">
                    <h1>Registration Form</h1>
                </div>
                <!-- Car Add/Edit Form -->

                <div class="form">
                    <!-- Name -->
                    <div class="row">
                        <label>Name:</label>
                        <input type="text" v-model="form.name" ref="name_ref" @input="checkName">
                        <div v-show="error_msg_name" class="error">{{ error_msg_name }} </div>
                    </div>
                    <!-- Email -->
                    <div class="row">
                        <label>Email:</label>
                        <input type="email" v-model="form.email" ref="email_ref" @input="checkEmail">
                        <div v-show="error_msg_email" class="error">{{ error_msg_email }} </div>
                    </div>
                    <!-- Password -->
                    <div class="row">
                        <label>Password:</label>
                        <input type="password" v-model="form.password" ref="password_ref" @input="checkPassword">
                        <div v-show="error_msg_password" class="error">{{ error_msg_password }} </div>
                    </div>
                    <!-- Confirm Password -->
                    <div class="row">
                        <label>Confirm Password:</label>
                        <input type="password" v-model="form.confirmPassword" ref="confirmPassword_ref"
                            @input="checkConfirmPassword">
                        <div v-show="error_msg_confirmPassword" class="error">{{ error_msg_confirmPassword }} </div>
                    </div>
                    <!-- Role -->
                    <div class="row">
                        <label>Role:</label>
                        <select v-model="form.role" ref="role_ref" @change="checkRole">
                            <option value="Admin">Admin</option>
                            <option value="Employee">Employee</option>
                            <option value="Customer">Customer</option>
                        </select>
                        <div v-show="error_msg_role" class="error">{{ error_msg_role }} </div>
                    </div>
                    <!-- Gender -->
                    <div class="gender-class">
                        <div class="row-gender row ">
                            <label>Gender:</label>
                            <div class="gender">
                                <div class="male">
                                    <input type="radio" value="male" id="male" name="gender" v-model="form.gender"
                                        ref="gender_ref" @change="checkGender" />
                                    <label for="male">Male</label>
                                </div>
                                <div class="female">
                                    <input type="radio" value="female" id="female" name="gender" v-model="form.gender"
                                        ref="gender_ref" @change="checkGender" />
                                    <label for="female">Female</label>
                                </div>
                            </div>
                        </div>
                        <div v-if="error_msg_gender" class="error">{{ error_msg_gender }} </div>
                    </div>
                    <!-- Age -->
                    <div class="row">
                        <label>Age:</label>
                        <input type="number" v-model.number="form.age" ref="age_ref"
                            onkeydown="return (event.keyCode !== 107 && event.keyCode !== 109 && event.keyCode !== 69);"
                            @input="checkAge">
                        <!-- Prevent the user from pressing key : +,-,e -->
                        <div v-if="error_msg_age" class="error">{{ error_msg_age }}</div>
                    </div>
                    <!-- DOB -->
                    <div class="row">
                        <label>Date of Birth:</label>
                        <input type="date" v-model="form.dob" ref="dob_ref" :max="formattedDate()" min="1923-12-31"
                            @input="checkDOB" onkeydown="return false;">
                        <div v-if="error_msg_dob" class="error">{{ error_msg_dob }}</div>
                    </div>
                    <div class="row row-button">
                        <button class="submit" @click.prevent="submit">Register</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '../stores/user'
const userStore = useUserStore()

const form = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    gender: '',
    age: '',
    dob: ''
})

const error_msg_name = ref("")
const name_ref = ref(null)
function checkName() {
    if (form.name === "") {
        const msg = "**Please enter name**"
        showError(error_msg_name, msg, name_ref)
        return false;
    }
    clearError(error_msg_name)
    return true
}

const error_msg_email = ref("")
const email_ref = ref(null)
function checkEmail() {
    if (form.email === "") {
        const msg = "**Please enter email**"
        showError(error_msg_email, msg, email_ref)
        return false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            const msg = "**Please enter valid email**"
            showError(error_msg_email, msg, email_ref)
            return false;
        }
        clearError(error_msg_email)
        return true
    }
}

const error_msg_password = ref("")
const password_ref = ref(null)
function checkPassword() {
    if (form.password === "") {
        const msg = "**Please enter password**"
        showError(error_msg_password, msg, password_ref)
        return false;
    } else {
        const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
        if (!passRegex.test(form.password)) {
            const msg = "**Password must be 8-12 characters, 1 number, 1 special character**"
            showError(error_msg_password, msg, password_ref)
            return false;
        }
        clearError(error_msg_password)
        return true
    }
}
const error_msg_confirmPassword = ref("")
const confirmPassword_ref = ref(null)
function checkConfirmPassword() {
    if (form.confirmPassword === "") {
        const msg = "**Please enter the password again to confirm**"
        showError(error_msg_confirmPassword, msg, confirmPassword_ref)
        return false;
    } else {
        if (form.password !== form.confirmPassword) {
            const msg = "**Confirm Password does not match the Password field**"
            showError(error_msg_confirmPassword, msg, confirmPassword_ref)
            return false;
        }
        clearError(error_msg_confirmPassword)
        return true;
    }
}

const error_msg_role = ref("")
const role_ref = ref(null)
function checkRole() {
    if (form.role === "") {
        const msg = "**Please choose your role**"
        showError(error_msg_role, msg, role_ref)
        return false;
    }
    clearError(error_msg_role)
    return true;
}

const error_msg_gender = ref("")
const gender_ref = ref(null)
function checkGender() {
    if (form.gender === "") {
        const msg = "**Please choose your gender**"
        showError(error_msg_gender, msg, gender_ref)
        return false;
    }
    clearError(error_msg_gender)
    return true
}

const error_msg_age = ref("")
const age_ref = ref(null)
function checkAge() {
    if (form.age === "") {
        const msg = "**Please enter your age**"
        showError(error_msg_age, msg, age_ref)
        return false;
    } else {
        const age = form.age
        if (typeof form.age != 'number' || age.toString().includes(".")) {
            const msg = "**Age should be whole number**"
            showError(error_msg_age, msg, age_ref)
            return false
        } else if (form.age < 18 || form.age > 100) {
            const msg = "**Age should be between 18-100**"
            showError(error_msg_age, msg, age_ref)
            return false
        }
        clearError(error_msg_age)
        return true
    }
}
const error_msg_dob = ref("")
const dob_ref = ref(null)
function checkDOB() {
    if (form.dob === "") {
        const msg = "**Please choose your Date of Birth**"
        showError(error_msg_dob, msg, dob_ref)
        return false;
    }
    clearError(error_msg_dob)
    return true;
}

function submit() {
    checkName(), checkEmail(), checkPassword(), checkConfirmPassword(), checkRole(), checkGender(), checkAge(), checkDOB()
    if (checkName() && checkEmail() && checkPassword() && checkConfirmPassword() && checkRole() && checkGender() && checkAge() && checkDOB()) {
        const data = {
            name: form.name,
            email: form.email,
            role: form.role,
            password: form.password,
            age: form.age,
            dob: form.dob,
            gender: form.gender
        }
        userStore.registerUser(data)
    }
}
function clearError(error) {
    error.value = "";
}

function showError(error, msg, ref) {
    error.value = msg,
        ref.value.focus()
}
function formattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // add 1 to adjust for 0-based indexing
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}
</script>

