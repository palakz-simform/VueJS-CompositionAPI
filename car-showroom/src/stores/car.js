import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
export const useCarStore = defineStore('car', {
    state: () => {
        return {
            cars_info: [],
            showModal: false,
            addForm: false,
            editForm: false,
            cardata: {},
            title: "",
            carDetail: {}
        }
    },
    getters: {
        carCardInfo(state) {
            return state.cars_info
        },
        carDetailInfo(state) {
            return state.carDetail
        }
    },
    actions: {
        // fetching data
        getData() {
            axios.get("https://testapi.io/api/dartya/resource/cardata", {
            }).then((response) => {
                this.cars_info = response.data.data
            })
        },
        addCar() {
            this.showModal = true,
                this.title = 'Add Car',
                this.addForm = true
        },
        // Add Car data
        setdata(formdata) {
            this.showModal = false;
            const id = this.cars_info.length + 1;
            axios.post('https://testapi.io/api/dartya/resource/cardata/', {
                id: id,
                name: formdata.name,
                image: formdata.image,
                details: formdata.description,
                price: formdata.price
            }).then((res) => {
                if (res.status === 201) {
                    this.getData()
                } else {
                    alert("Error!!")
                }
                this.addForm = false
            }).catch(error => {
                alert("Error : " + error)
            });
        },

        showEdit(data) {
            this.editForm = true;
            this.addForm = false;
            this.cardata = data;
            this.title = this.cardata.title;
            this.showModal = true;

        },
        //Edit Car Data
        editCarData(data) {
            this.showModal = false;
            axios.put('https://testapi.io/api/dartya/resource/cardata/' + data.id, {
                id: data.id,
                name: data.name,
                image: data.image,
                details: data.description,
                price: data.price
            }).then((res) => {
                if (res.status === 200) {
                    this.getData()
                } else {
                    alert("Error!!")
                }
                this.editForm = false

            }).catch(error => {
                alert("Error : " + error)
            });

        },
        //Delete Car
        deleteCar(data) {
            if (confirm("Do you want to delete this car data ?") == true) {
                axios.delete('https://testapi.io/api/dartya/resource/cardata/' + data.id).then((res) => {
                    if (res.status === 204) {
                        this.getData()
                        alert("Car : " + data.name + " deleted successuflly!")
                    } else {
                        alert("Error!!")
                    }
                }).catch(error => {
                    alert("Error : " + error)
                })
            }
        },
        getCarDetail(id) {
            axios.get(`https://testapi.io/api/dartya/resource/cardata/${id}`).then((response) => {
                this.carDetail = response.data
            })
        },
    }
})