import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, reactive, computed } from 'vue'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
import Swal from 'sweetalert2'
export const useCarStore = defineStore('car', () => {

    const cars_info = reactive([])
    const showModal = ref(false)
    const addForm = ref(false)
    const cardata = reactive({})
    const carDetail = reactive({})

    const carCardInfo = computed(() => {
        return cars_info
    })
    const carDetailInfo = computed(() => {
        return carDetail
    })

    function alertErrorData() {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error Occured!! Please Try again'
        })
    }
    function addCar() {
        showModal.value = true
        addForm.value = true
    }
    // Add Car data
    async function setdata(formdata) {
        try {
            const response = await axios.post('cardata', {
                name: formdata.name,
                image: formdata.image,
                details: formdata.description,
                price: formdata.price
            })
            if (response.status === 201) {
                getData()
                showModal.value = false;
                return true
            } else {
                alertErrorData()
                // alert("Error!! Try again")
                return false
            }
        }
        catch {
            alertErrorData()
            // alert("Error!! Please Try again")
            return false
        }
    }
    function showEdit(data) {
        addForm.value = false;
        cardata.id = data.id
        cardata.name = data.name
        cardata.image = data.image
        cardata.description = data.description
        cardata.price = data.price
        showModal.value = true;

    }
    //Edit Car Data
    async function editCarData(data) {
        try {
            const response = await axios.put(`cardata/${data.id}`, {
                name: data.name,
                image: data.image,
                details: data.description,
                price: data.price
            })
            if (response.status === 200) {
                getData()
                showModal.value = false;
                return true
            } else {
                alertErrorData()
                return false
            }
        }
        catch {
            alertErrorData()
            return false
        }
    }
    //Delete Car
    function deleteCar(data) {
        if (confirm("Do you want to delete this car data ?") == true) {
            axios.delete(`cardata/${data.id}`).then((res) => {
                if (res.status === 204) {
                    getData()
                    alert("Car : " + data.name + " deleted successuflly!")
                } else {
                    alertErrorData()
                }
            }).catch(() => {
                alertErrorData()
            })
        }
    }
    // fetching data
    async function getData() {
        const response = await axios.get('cardata')
        cars_info.splice(0, cars_info.length, ...response.data.data)
    }

    function getCarDetail(id) {
        axios.get(`cardata/${id}`).then((response) => {
            carDetail.id = response.data.id
            carDetail.name = response.data.name
            carDetail.image = response.data.image
            carDetail.details = response.data.details
            carDetail.price = response.data.price
        })
    }
    return {
        cars_info, showModal, addForm, cardata, carDetail, carCardInfo, carDetailInfo, getData, addCar, setdata, showEdit, editCarData, deleteCar, getCarDetail
    }
})
