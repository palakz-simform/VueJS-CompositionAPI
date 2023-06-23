import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, reactive, computed } from 'vue'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
import Swal from 'sweetalert2'
export const useCarStore = defineStore('car', () => {

    const carsInfo = reactive([])
    const showModal = ref(false)
    const addForm = ref(false)
    const cardata = reactive({})
    const carDetail = reactive({})

    const carCardInfo = computed(() => {
        return carsInfo
    })
    const carDetailInfo = computed(() => {
        return carDetail
    })

    function alertErrorData() {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error Occured!! Please Try again',
            showConfirmButton: false,
            timer: 1500
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
                return false
            }
        }
        catch {
            alertErrorData()
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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            iconColor: 'red',
            showCancelButton: true,
            confirmButtonColor: '#23B1AC',
            cancelButtonColor: 'black',
            confirmButtonText: 'Yes, delete it!',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`cardata/${data.id}`).then((res) => {
                    if (res.status === 204) {
                        getData()
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Car Data Deleted Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        alertErrorData()
                    }
                }).catch(() => {
                    alertErrorData()
                })

            }
        })
    }
    // fetching data
    async function getData() {
        const response = await axios.get('cardata')
        carsInfo.splice(0, carsInfo.length, ...response.data.data)
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
        carsInfo, showModal, addForm, cardata, carDetail, carCardInfo, carDetailInfo, getData, addCar, setdata, showEdit, editCarData, deleteCar, getCarDetail
    }
})
