import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, reactive, computed, isRef, isReactive } from 'vue'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
export const useCarStore = defineStore('car', () => {

    const cars_info = reactive([])
    const showModal = ref(false)
    const addForm = ref(false)
    const editForm = ref(false)
    const cardata = reactive({})
    const title = ref("")
    const carDetail = reactive({})

    const carCardInfo = computed(() => {
        return cars_info
    })
    const carDetailInfo = computed(() => {
        return carDetail
    })

    function addCar() {
        showModal.value = true,
            title.value = 'Add Car',
            addForm.value = true
    }
    // Add Car data
    function setdata(formdata) {
        showModal.value = false;
        axios.post('https://testapi.io/api/dartya/resource/cardata/', {
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
        editForm.value = true;
        addForm.value = false;
        cardata.id = data.id
        cardata.name = data.name
        cardata.image = data.image
        cardata.description = data.description
        cardata.price = data.price
        cardata.title = data.title
        title.value = cardata.title;
        showModal.value = true;

    }
    //Edit Car Data
    function editCarData(data) {
        showModal.value = false;
        axios.put('https://testapi.io/api/dartya/resource/cardata/' + data.id, {
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
            editForm.value = false

        }).catch(error => {
            alert("Error : " + error)
        });

    }
    //Delete Car
    function deleteCar(data) {
        if (confirm("Do you want to delete this car data ?") == true) {
            axios.delete('https://testapi.io/api/dartya/resource/cardata/' + data.id).then((res) => {
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
    function getData() {
        axios.get("https://testapi.io/api/dartya/resource/cardata", {
        }).then((response) => {
            cars_info.splice(0, cars_info.length, ...response.data.data)
        })
    }

    function getCarDetail(id) {
        axios.get(`https://testapi.io/api/dartya/resource/cardata/${id}`).then((response) => {
            carDetail.id = response.data.id
            carDetail.name = response.data.name
            carDetail.image = response.data.image
            carDetail.details = response.data.details
            carDetail.price = response.data.price
        })
    }
    return {
        cars_info, showModal, addForm, editForm, cardata, title, carDetail, carCardInfo, carDetailInfo, getData, addCar, setdata, showEdit, editCarData, deleteCar, getCarDetail
    }
})
