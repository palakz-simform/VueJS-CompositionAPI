import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router/index'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const name = ref("")
    const email = ref("")
    const role = ref(localStorage.getItem('role'))
    const password = ref("")
    const age = ref("")
    const dob = ref("")
    const gender = ref("")
    const login = ref(localStorage.getItem('loggedIn'))


    console.log(role.value)

    async function logInUser(user) {
        try {
            const res = await axios.get('https://testapi.io/api/dartya/resource/users')
            const data = await res.data.data
            if (res.status == 200) {
                const userData = data.find(udata => udata.email == user.email)
                if (!userData) {
                    alert("Invalid Email!! Please try again")
                    return false
                }
                if (userData.password == user.password) {
                    console.log(userData)
                    name.value = userData.name,
                        email.value = userData.email,
                        role.value = userData.role,
                        password.value = userData.password,
                        age.value = userData.age,
                        dob.value = userData.dob,
                        gender.value = userData.gender
                    login.value = "true"
                    try {
                        const res = await axios.post('https://reqres.in/api/login', {
                            email: "eve.holt@reqres.in",
                            password: "cityslicka"
                        })
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('loggedIn', true)
                        localStorage.setItem('role', role.value)
                    }
                    catch (err) {
                        localStorage.setItem('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`)
                        localStorage.setItem('loggedIn', true)
                        localStorage.setItem('role', role.value)
                    }
                    router.push({
                        name: 'home'
                    })
                }
                else {
                    alert("Invalid Password!! Please try again")
                }
            }
        }
        catch (err) {
            alert("Error occured!! Please try again")
        }
    }
    async function registerUser(data) {
        try {
            const res = await axios.post('https://testapi.io/api/dartya/resource/users', {
                name: data.name,
                email: data.email,
                role: data.role,
                password: data.password,
                age: data.age,
                dob: data.dob,
                gender: data.gender
            })
            if (res.status === 201) {
                alert(' User added Successfully: \n\nName: ' + data.name + '\nEmail: ' + data.email + '\nRole :' + data.role + '\nGender:' + data.gender + '\nAge:' + data.age + '\nDate of Birth:' + data.dob)
                router.push({
                    name: 'login'
                })
            }
        }
        catch (error) {
            alert("Error occured! Please try again")
        }
    }
    function logout() {
        if (confirm("Do you really want to log out ?") == true) {
            localStorage.setItem('token', "")
            localStorage.setItem("loggedIn", false)
            localStorage.setItem('role', "")
            router.push({
                name: 'login'
            })
            login.value = "false"
            setTimeout(() => {
                alert("Logged Out Successfully")
            }, 500)

        }
    }
    return {
        login, logInUser, registerUser, logout, role
    }
})