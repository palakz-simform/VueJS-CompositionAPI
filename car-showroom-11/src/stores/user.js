import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router/index'
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const useUserStore = defineStore('user', () => {
    const name = ref("")
    const email = ref("")
    const role = ref(localStorage.getItem('role'))
    const password = ref("")
    const age = ref("")
    const dob = ref("")
    const gender = ref("")
    const login = ref(localStorage.getItem('loggedIn'))
    const users = ref("")

    const usersInfo = computed(() => {
        return users
    })
    async function logInUser(user) {
        try {
            const res = await axios.get('users')
            const data = await res.data.data
            if (res.status == 200) {
                const userData = data.find(udata => udata.email == user.email)
                if (!userData) {
                    alert("Invalid Email!! Please try again")
                    return false
                }
                else {
                    if (userData.password == user.password) {
                        name.value = userData.name
                        email.value = userData.email
                        role.value = userData.role
                        password.value = userData.password
                        age.value = userData.age
                        dob.value = userData.dob
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
        }
        catch (err) {
            alert("Error occured!! Please try again")
        }
    }
    async function registerUser(data) {
        try {
            const res = await axios.post('users', {
                name: data.name,
                email: data.email,
                role: data.role,
                password: data.password,
                age: data.age,
                dob: data.dob,
                gender: data.gender
            })
            if (res.status === 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: ' User added Successfully: \n\nName: ' + data.name + '\nEmail: ' + data.email + '\nRole :' + data.role + '\nGender:' + data.gender + '\nAge:' + data.age + '\nDate of Birth:',
                    showConfirmButton: false,
                    timer: 1500
                })
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
        Swal.fire({
            title: 'Do you really want to Log out?',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            confirmButtonColor: "#23B1AC",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let timerInterval
                Swal.fire({
                    title: 'Logging you out!',
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        localStorage.setItem('token', "")
                        localStorage.setItem("loggedIn", false)
                        localStorage.setItem('role', "")
                        login.value = "false"
                        router.push({
                            name: 'login'
                        })
                    }
                })
            }
        })


    }
    async function getUsersData() {
        try {
            const res = await axios.get('users')
            users.value = await res.data.data
        }
        catch (err) {
            alert("Error occured!! Please try again")
        }
    }
    return {
        login, logInUser, registerUser, logout, role, users, getUsersData, usersInfo
    }
})