import { ref } from "vue"

export const useValidation = () => {

    const email = ref("")
    const errorMsgEmail = ref("")
    const emailRef = ref(null)
    function checkEmail() {
        if (email.value === "") {
            const msg = "**Please enter valid email**"
            showError(errorMsgEmail, msg, emailRef)
            return false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                const msg = "**Please enter valid email**"

                showError(errorMsgEmail, msg, emailRef)
                return false;
            }
            clearError(errorMsgEmail)
            return true;
        }
    }

    const errorMsgPassword = ref("")
    const password = ref("")
    const passwordRef = ref(null)
    function checkPassword() {
        if (password.value === "") {
            const msg = "**Please enter password**"
            showError(errorMsgPassword, msg, passwordRef)
            return false;
        } else {
            const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
            if (!passRegex.test(password.value)) {
                const msg = "**Password must be 8-12 characters, 1 number, 1 special character**"
                showError(errorMsgPassword, msg, passwordRef)
                return false;
            }
            clearError(errorMsgPassword)
            return true;
        }
    }

    const name = ref("")
    const errorMsgName = ref("")
    const nameRef = ref(null)
    function checkName() {
        if (name.value === "") {
            const msg = "**Please enter name**"
            showError(errorMsgName, msg, nameRef)
            return false;
        }
        clearError(errorMsgName)
        return true
    }

    const confirmPassword = ref("")
    const errorMsgConfirmPassword = ref("")
    const confirmPasswordRef = ref(null)
    function checkConfirmPassword() {
        if (confirmPassword.value === "") {
            const msg = "**Please enter the password again to confirm**"
            showError(errorMsgConfirmPassword, msg, confirmPasswordRef)
            return false;
        } else {
            if (password.value !== confirmPassword.value) {
                const msg = "**Confirm Password does not match the Password field**"
                showError(errorMsgConfirmPassword, msg, confirmPasswordRef)
                return false;
            }
            clearError(errorMsgConfirmPassword)
            return true;
        }
    }

    const role = ref("")
    const errorMsgRole = ref("")
    const roleRef = ref(null)
    function checkRole() {
        if (role.value === "") {
            const msg = "**Please choose your role**"
            showError(errorMsgRole, msg, roleRef)
            return false;
        }
        clearError(errorMsgRole)
        return true;
    }

    const gender = ref("")
    const errorMsgGender = ref("")
    const genderRef = ref(null)
    function checkGender() {
        if (gender.value === "") {
            const msg = "**Please choose your gender**"
            showError(errorMsgGender, msg, genderRef)
            return false;
        }
        clearError(errorMsgGender)
        return true
    }

    const age = ref("")
    const errorMsgAge = ref("")
    const ageref = ref(null)
    function checkAge() {
        if (age.value === "") {
            const msg = "**Please enter your age**"
            showError(errorMsgAge, msg, ageref)
            return false;
        } else {
            const person_age = age.value
            if (typeof age.value != 'number' || person_age.toString().includes(".")) {
                const msg = "**Age should be whole number**"
                showError(errorMsgAge, msg, ageref)
                return false
            } else if (age.value < 18 || age.value > 100) {
                const msg = "**Age should be between 18-100**"
                showError(errorMsgAge, msg, ageref)
                return false
            }
            clearError(errorMsgAge)
            return true
        }
    }

    const dob = ref("")
    const errorMsgDob = ref("")
    const dobRef = ref(null)
    function checkDOB() {
        if (dob.value === "") {
            const msg = "**Please choose your Date of Birth**"
            showError(errorMsgDob, msg, dobRef)
            return false;
        }
        clearError(errorMsgDob)
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
        name, errorMsgName, nameRef, checkName,
        email, errorMsgEmail, emailRef, checkEmail,
        errorMsgPassword, password, passwordRef, checkPassword,
        confirmPassword, errorMsgConfirmPassword, confirmPasswordRef, checkConfirmPassword,
        role, errorMsgRole, roleRef, checkRole,
        gender, errorMsgGender, genderRef, checkGender,
        age, errorMsgAge, ageref, checkAge,
        dob, errorMsgDob, dobRef, checkDOB
    }
}