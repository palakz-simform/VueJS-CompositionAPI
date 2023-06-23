<template>
    <!-- Car Form for Edit and Add Car -->
    <div class="form-add-edit-car">
        <div class="modal">
            <div class="car-add-edit-heading">
                <h1>{{ carStore.addForm == true ? $t('car-form.addCar') : $t('car-form.editCar') }}</h1>
                <!-- Button to click when the user wants to close the form -->
                <button class="buttonx" @click="showModalx">x</button>
            </div>
            <!-- Car Add/Edit Form -->
            <div class="form-car">
                <div class="car-form-row">
                    <label>{{ $t('car-form.name') }} <span class="required-field">*</span></label>
                    <input type="text" v-model="form.name" ref="nameRef" @input="checkName">
                    <div v-show="errorMsgName" class="car-error">{{ errorMsgName }}</div>
                </div>
                <div class="car-form-row">
                    <label>{{ $t('car-form.image') }} <span class="required-field">*</span></label>
                    <input type="url" v-model="form.image" ref="imageRef" @input="checkImage">
                    <div v-show="errorMsgImage" class="car-error">{{ errorMsgImage }}</div>
                </div>
                <div class="car-form-row">
                    <label>{{ $t('car-form.description') }} <span class="required-field">*</span></label>
                    <textarea v-model="form.description" ref="descriptionRef" @input="checkDescription"></textarea>
                    <div v-show="errorMsgDescription" class="car-error">{{ errorMsgDescription }}</div>
                </div>
                <div class="car-form-row">
                    <label>{{ $t('car-form.price') }} <span class="required-field">*</span></label>
                    <input type="number" v-model.number="form.price" ref="priceRef"
                        onkeydown="return (event.keyCode !== 107 && event.keyCode !== 109 && event.keyCode !== 69);"
                        @input="checkPrice">
                    <!-- Prevent the user from pressing key : +,-,e -->
                    <div v-show="errorMsgPrice" class="car-error">{{ errorMsgPrice }}</div>
                </div>
                <button @click="submit" class="submit-car">{{ carStore.addForm === true ? $t('car-form.submit') :
                    $t('car-form.edit') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, reactive } from 'vue';
import { useCarStore } from '../stores/car';
const carStore = useCarStore()
import Swal from 'sweetalert2'
const form = reactive({
    id: ref(carStore.cardata.id),
    name: ref(""),
    image: ref(""),
    description: ref(""),
    price: ref("")
})
if (carStore.addForm == true) {
    form.name = ""
    form.image = ""
    form.description = ""
    form.price = ""

}
// Set this data when the form is Edit Car Data
else {
    form.id = carStore.cardata.id
    form.name = carStore.cardata.name
    form.image = carStore.cardata.image
    form.description = carStore.cardata.description
    form.price = carStore.cardata.price
}

const errorMsgName = ref("")
const nameRef = ref(null)
function checkName() {
    // Checking that name is not empty and is a string
    if (form.name === "" || typeof form.name != 'string') {
        const msg = "**Please enter name**"
        showError(errorMsgName, msg, nameRef)
        return false
    }
    clearError(errorMsgName)
    return true
}

const errorMsgImage = ref("")
const imageRef = ref(null)
function checkImage() {
    // Checking that image is not empty 
    if (form.image === "") {
        const msg = "**Please enter image URL**"
        showError(errorMsgImage, msg, imageRef)
        return false
    }
    // If image is not empty, checking that the input is an URL
    else {
        const url = form.image;
        const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
        if (!regex.test(url)) {
            const msg = "**Please enter valid image URL**"
            showError(errorMsgImage, msg, imageRef)
            return false
        }
        clearError(errorMsgImage)
        return true
    }
}

const errorMsgDescription = ref("")
const descriptionRef = ref(null)
function checkDescription() {
    // Checking that the description is not empty
    if (form.description === "") {
        const msg = "**Please enter description**"
        showError(errorMsgDescription, msg, descriptionRef)
        return false
    }
    // If the description is not empty, checking that the no. of characters is between 30-120
    else if (form.description.length < 30 || form.description.length > 120 || typeof form.description != 'string') {
        const msg = "**Description must be 30-120 characters long**"
        showError(errorMsgDescription, msg, descriptionRef)
        return false
    }
    clearError(errorMsgDescription)
    return true
}

async function submit() {
    // Form validation  
    checkName(), checkImage(), checkDescription(), checkPrice()
    if (checkName() && checkImage() && checkDescription() && checkPrice()) {
        //  Execute if Add Car
        if (carStore.addForm == true) {
            const response = await carStore.setdata(form)
            if (response == true) { alertData() }
        }
        // Execute if Edit Car
        else {
            const response = await carStore.editCarData(form)
            if (response == true) { alertData() }
        }
    }
}

const errorMsgPrice = ref("")
const priceRef = ref(null)
function checkPrice() {
    // checking that the price is not empty
    if (form.price === "") {
        const msg = "**Please enter price**"
        showError(errorMsgPrice, msg, priceRef)
        return false
    }
    clearError(errorMsgPrice)
    return true
}
function showModalx() {
    carStore.showModal = false;
}
function clearError(error) {
    error.value = "";
}

// function to alert data after submitting the form
function alertData() {
    if (carStore.addCar == true) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Car Added Successfully!',
            showConfirmButton: false,
            timer: 1500
        })
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Car Data Edited Successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }
}
function showError(error, msg, ref) {
    error.value = msg;
    ref.value.focus()
}
</script>


<style scoped>
h1 {
    text-align: center;
    color: rgb(35, 177, 172)
}

button {
    color: white;
    cursor: pointer;
}

div.car-form-row {
    height: 80px;
    margin-top: 0px;
}

.car-add-edit-heading {
    display: flex;
    justify-content: space-between;
    padding: 1px 10px 5px 130px;
}

.buttonx {
    height: 20px;
    margin-top: 10px;
    font-weight: bold;
    background-color: transparent;
    border: none;
    font-size: 18px;
}

label {
    padding-left: 40px;
    font-size: 18px;
    color: white
}

.car-error {
    color: rgb(220, 73, 73);
    padding-left: 40px;
    margin-top: 4px;
    margin-bottom: 0px;

}

.car-form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    margin-top: 10px;
}

input,
textarea {
    margin-left: 40px;
    margin-top: 10px;
    margin-right: 40px;
    height: 28px;
    padding-left: 5px;
    background-color: black;
    border: 0px;
    border-bottom: 1px solid rgb(255, 255, 255, 0.5);
    color: white;
    font-size: 15px;

}

textarea {
    height: 23px;
    padding-top: 8px;
}

textarea:focus,
input:focus {
    outline: none !important;
    border: 0px;
    border-bottom: 1px;
    box-shadow: 0px 2px 0px rgb(255, 255, 255);
    opacity: 1;
}

.submit-car {
    width: 100px;
    height: 35px;
    background-color: rgb(35, 177, 172);
    color: rgb(0, 0, 0);
    font-weight: bold;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    margin-top: 25px;
    margin-left: 140px;

}

.submit-car:hover {
    background-color: transparent;
    color: rgb(35, 177, 172);
    border: 3px solid rgb(35, 177, 172);
}

.modal {
    width: 100%;
    max-width: 400px;
    border-radius: 5px;
    height: 600px;
    background-color: black;
    border: 1px solid rgb(35, 177, 172);
    border-radius: 15px;
    box-shadow: 8px 10px 5px 0 rgb(35, 177, 172, 0.7);
}

.form-add-edit-car {
    position: fixed;
    top: 15%;
    left: 0;
    right: 0;
    bottom: 10;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 400px) {
    .modal {
        max-width: 300px;
    }

    .car-add-edit-heading {
        padding: 1px 10px 5px 90px;
    }

    .submit-car {
        margin-left: 100px;
    }
}
</style>
