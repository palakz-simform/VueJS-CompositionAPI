<template>
    <!-- Car Form for Edit and Add Car -->
    <div class="form-add-edit-car">
        <div class="modal">
            <div class="heading">
                <h1>{{ carStore.title }}</h1>
                <!-- Button to click when the user wants to close the form -->
                <button class="button" @click="showModalx">x</button>
            </div>
            <!-- Car Add/Edit Form -->
            <div class="form">
                <div class="row">
                    <label>Name:</label>
                    <input type="text" v-model="form.name" ref="name_ref" @input="checkName">
                    <div v-show="error_msg_name" class="error">{{ error_msg_name }}</div>
                </div>
                <div class="row">
                    <label>Image:</label>
                    <input type="url" v-model="form.image" ref="image_ref" @input="checkImage">
                    <div v-show="error_msg_image" class="error">{{ error_msg_image }}</div>
                </div>
                <div class="row">
                    <label>Description:</label>
                    <textarea v-model="form.description" ref="description_ref" @input="checkDescription"></textarea>
                    <div v-show="error_msg_description" class="error">{{ error_msg_description }}</div>
                </div>
                <div class="row">
                    <label>Price:</label>
                    <input type="number" v-model.number="form.price" ref="price_ref"
                        onkeydown="return (event.keyCode !== 107 && event.keyCode !== 109 && event.keyCode !== 69);"
                        @input="checkPrice">
                    <!-- Prevent the user from pressing key : +,-,e -->
                    <div v-show="error_msg_price" class="error">{{ error_msg_price }}</div>
                </div>
                <button @click="submit" class="submit">{{ carStore.addForm === true ? 'Submit' : 'Edit' }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useCarStore } from '../stores/car';

const carStore = useCarStore()

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
else if (carStore.editForm == true) {
    form.id = carStore.cardata.id
    form.name = carStore.cardata.name
    form.image = carStore.cardata.image
    form.description = carStore.cardata.description
    form.price = carStore.cardata.price
}

const error_msg_name = ref("")
const name_ref = ref(null)
function checkName() {
    // Checking that name is not empty and is a string
    if (form.name === "" || typeof form.name != 'string') {
        const msg = "**Please enter name**"
        showError(error_msg_name, msg, name_ref)
        return false
    }
    clearError(error_msg_name)
    return true
}

const error_msg_image = ref("")
const image_ref = ref(null)
function checkImage() {
    // Checking that image is not empty 
    if (form.image === "") {
        const msg = "**Please enter image URL**"
        showError(error_msg_image, msg, image_ref)
        return false
    }
    // If image is not empty, checking that the input is an URL
    else {
        const url = form.image;
        const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
        if (!regex.test(url)) {
            const msg = "**Please enter valid image URL**"
            showError(error_msg_image, msg, image_ref)
            return false
        }
        clearError(error_msg_image)
        return true
    }
}

const error_msg_description = ref("")
const description_ref = ref(null)
function checkDescription() {
    // Checking that the description is not empty
    if (form.description === "") {
        const msg = "**Please enter description**"
        showError(error_msg_description, msg, description_ref)
        return false
    }
    // If the description is not empty, checking that the no. of characters is between 30-120
    else if (form.description.length < 30 || form.description.length > 120 || typeof form.description != 'string') {
        const msg = "**Description must be 30-120 characters long**"
        showError(error_msg_description, msg, description_ref)
        return false
    }
    clearError(error_msg_description)
    return true
}

function submit() {
    // Form validation  
    checkName(), checkImage(), checkDescription(), checkPrice()
    if (checkName() && checkImage() && checkDescription() && checkPrice()) {
        //  Execute if Add Car
        if (carStore.addForm == true) {
            alertData()
            carStore.setdata(form)
        }
        // Execute if Edit Car
        else if (carStore.editForm == true) {
            alertData()
            carStore.editCarData(form)
        }
    }
}

const error_msg_price = ref("")
const price_ref = ref(null)
function checkPrice() {
    // checking that the price is not empty
    if (form.price === "") {
        const msg = "**Please enter price**"
        showError(error_msg_price, msg, price_ref)
        return false
    }
    clearError(error_msg_price)
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
    alert((carStore.addForm == true ? 'Created' : 'Edited') + ' data: \n\nName: ' + form.name + '\n\nImage:' + form.image + '\n\nDescription :' + form.description + '\n\nPrice Rs.:' + form.price)
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
    color: white
}

div.row {
    height: 80px;
    margin-top: 0px;
}

.heading {
    display: flex;
    justify-content: space-between;
    padding: 1px 10px 5px 130px;
}

.button {
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

.error {
    color: rgb(220, 73, 73);
    padding-left: 40px;
    margin-top: 4px;
    margin-bottom: 0px;

}

.row {
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

.submit {
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

.submit:hover {
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

    .heading {
        padding: 1px 10px 5px 90px;
    }

    .submit {
        margin-left: 100px;
    }
}
</style>
