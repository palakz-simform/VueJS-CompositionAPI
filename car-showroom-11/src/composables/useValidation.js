import { ref } from "vue"

export const useValidation = () => {

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

    const name = ref("")
    const error_msg_name = ref("")
    const name_ref = ref(null)
    function checkName() {
        if (name.value === "") {
            const msg = "**Please enter name**"
            showError(error_msg_name, msg, name_ref)
            return false;
        }
        clearError(error_msg_name)
        return true
    }

    const confirmPassword = ref("")
    const error_msg_confirmPassword = ref("")
    const confirmPassword_ref = ref(null)
    function checkConfirmPassword() {
        if (confirmPassword.value === "") {
            const msg = "**Please enter the password again to confirm**"
            showError(error_msg_confirmPassword, msg, confirmPassword_ref)
            return false;
        } else {
            if (password.value !== confirmPassword.value) {
                const msg = "**Confirm Password does not match the Password field**"
                showError(error_msg_confirmPassword, msg, confirmPassword_ref)
                return false;
            }
            clearError(error_msg_confirmPassword)
            return true;
        }
    }

    const role = ref("")
    const error_msg_role = ref("")
    const role_ref = ref(null)
    function checkRole() {
        if (role.value === "") {
            const msg = "**Please choose your role**"
            showError(error_msg_role, msg, role_ref)
            return false;
        }
        clearError(error_msg_role)
        return true;
    }

    const gender = ref("")
    const error_msg_gender = ref("")
    const gender_ref = ref(null)
    function checkGender() {
        if (gender.value === "") {
            const msg = "**Please choose your gender**"
            showError(error_msg_gender, msg, gender_ref)
            return false;
        }
        clearError(error_msg_gender)
        return true
    }

    const age = ref("")
    const error_msg_age = ref("")
    const age_ref = ref(null)
    function checkAge() {
        if (age.value === "") {
            const msg = "**Please enter your age**"
            showError(error_msg_age, msg, age_ref)
            return false;
        } else {
            const person_age = age.value
            if (typeof age.value != 'number' || person_age.toString().includes(".")) {
                const msg = "**Age should be whole number**"
                showError(error_msg_age, msg, age_ref)
                return false
            } else if (age.value < 18 || age.value > 100) {
                const msg = "**Age should be between 18-100**"
                showError(error_msg_age, msg, age_ref)
                return false
            }
            clearError(error_msg_age)
            return true
        }
    }

    const dob = ref("")
    const error_msg_dob = ref("")
    const dob_ref = ref(null)
    function checkDOB() {
        if (dob.value === "") {
            const msg = "**Please choose your Date of Birth**"
            showError(error_msg_dob, msg, dob_ref)
            return false;
        }
        clearError(error_msg_dob)
        return true;
    }

    function clearError(error) {
        error.value = "";
    }

    function showError(error, msg, ref) {
        error.value = msg
        ref.value.focus()
    }
    return {
        name, error_msg_name, name_ref, checkName,
        email, error_msg_email, email_ref, checkEmail,
        error_msg_password, password, password_ref, checkPassword,
        confirmPassword, error_msg_confirmPassword, confirmPassword_ref, checkConfirmPassword,
        role, error_msg_role, role_ref, checkRole,
        gender, error_msg_gender, gender_ref, checkGender,
        age, error_msg_age, age_ref, checkAge,
        dob, error_msg_dob, dob_ref, checkDOB
    }
}