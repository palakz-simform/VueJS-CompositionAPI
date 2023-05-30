import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, reactive, computed, isRef, isReactive } from 'vue'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
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

    function addCar() {
        showModal.value = true
        addForm.value = true
    }
    // Add Car data
    function setdata(formdata) {
        showModal.value = false;
        axios.post(`${import.meta.env.BASE_URL}cardata`, {
            name: formdata.name,
            image: formdata.image,
            details: formdata.description,
            price: formdata.price
        }).then((res) => {
            if (res.status === 201) {
                getData()
            } else {
                alert("Error!!")
            }
            addForm.value = false
        }).catch(error => {
            alert("Error : " + error)
        });
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
    function editCarData(data) {
        showModal.value = false;
        axios.put(`${import.meta.env.BASE_URL}cardata/${data.id}`, {
            name: data.name,
            image: data.image,
            details: data.description,
            price: data.price
        }).then((res) => {
            if (res.status === 200) {
                getData()
            } else {
                alert("Error!!")
            }

        }).catch(error => {
            alert("Error : " + error)
        });

    }
    //Delete Car
    function deleteCar(data) {
        if (confirm("Do you want to delete this car data ?") == true) {
            axios.delete(`${import.meta.env.BASE_URL}cardata/${data.id}`).then((res) => {
                if (res.status === 204) {
                    getData()
                    alert("Car : " + data.name + " deleted successuflly!")
                } else {
                    alert("Error!!")
                }
            }).catch(error => {
                alert("Error : " + error)
            })
        }
    }
    // fetching data
    async function getData() {
        const response = await axios.get(`${import.meta.env.BASE_URL}cardata`)
        cars_info.splice(0, cars_info.length, ...response.data.data)
    }

    function getCarDetail(id) {
        axios.get(`${import.meta.env.BASE_URL}cardata/${id}`).then((response) => {
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
