<template>
    <!-- Card of each car -->
    <div class="card-car">
        <div class="heading">
            <h1>{{ name }}</h1>
        </div>
        <div class="car-image">
            <img :src="image" alt="car-image" />
        </div>
        <div class="car-description">
            <p>{{ description }}</p>
        </div>
        <div class="btn-car">
            <button class="car-edit-btn" @click="carStore.showEdit(getCarData())">
                <i class="fa-solid fa-pen"></i>
            </button>
            <RouterLink :to="{ name: 'carDetail', params: { id: id } }"><button class="button-info">Info</button>
            </RouterLink>
            <button class="car-delete-btn" @click="carStore.deleteCar(getCarData())">
                <i class="fa-sharp fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useCarStore } from "../stores/car";
const carStore = useCarStore()
const props = defineProps([
    "id",
    "name",
    "image",
    "formtype",
    "description",
    "price",
    "showModalEdit",
])
// On clicking edit button emit event 'edit-car'
function getCarData() {
    return {
        id: props.id,
        name: props.name,
        image: props.image,
        description: props.description,
        price: props.price,
        title: "Edit Car",
    }

}
</script>

<style scoped>
.card-car {
    width: 340px;
    margin: 10px;
    border-left: 2px solid rgb(35, 177, 172);
    border-top: 2px solid rgb(35, 177, 172);
    box-shadow: 6px 8px 15px 0 rgba(47, 243, 237, 0.7);
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
}

.card-car:hover {
    transform: scale(0.95);
    transition: 0.25s;
}

.heading h1 {
    padding-top: 8px;
    margin-top: 0px;
    margin-bottom: 0px;
}

.heading {
    height: 50px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    overflow: hidden;
    border-radius: 15px;
}


.car-image {
    width: 340px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
}

img {
    width: 340px;
    height: 200px;
}

.car-description p {
    font-weight: bold;
    line-height: 25px;
    padding: 4px;
    padding-left: 12px;
    padding-right: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.car-description {
    height: 100px;
    width: 340px;
    text-align: center;
}

.btn-car {
    width: 340px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.car-edit-btn,
.car-delete-btn {
    width: 55px;
    height: 34px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: rgb(44, 44, 44);
    border: 0px;
    color: white;
    font-weight: bolder;
    border-radius: 10px;
    cursor: pointer;
}

.button-info {
    width: 150px;
    height: 34px;
    background-color: rgb(44, 44, 44);
    border: 0px;
    color: white;
    font-weight: bolder;
    border-radius: 10px;
    cursor: pointer;
}

.button-info:hover,
.car-edit-btn:hover,
.car-delete-btn:hover {
    background-color: transparent;
    color: rgb(44, 44, 44);
    font-weight: bolder;
    border: 3px solid rgb(44, 44, 44);
}

@media (max-width: 1240px) {
    .card-car {
        width: 280px;
        box-shadow: 6px 8px 10px 0 rgba(47, 243, 237, 0.7);
    }

    .heading {
        height: 40px;
        font-size: 10px;
    }

    .car-image {
        width: 280px;
        height: 175px;
    }

    img {
        width: 280px;
        height: 175px;
    }

    .car-description p {
        padding: 6px;
    }

    .car-description {
        height: 120px;
        width: 280px;
        text-align: center;
    }

    .btn-car {
        width: 280px;
    }
}

@media (max-width: 1040px) {
    .card-car {
        width: 250px;
    }

    .car-image {
        width: 250px;
    }

    img {
        width: 250px;
    }

    .car-description p {
        -webkit-line-clamp: 4;
    }

    .car-description {
        width: 250px;
    }

    .btn-car {
        width: 250px;
    }
}

@media (max-width: 670px) {
    .card-car {
        margin: 5px;
        margin-bottom: 15px;
        width: 200px;
    }

    .heading {
        height: 25px;
        font-size: 8px;
    }

    .heading h1 {
        padding-top: 4px;
    }

    .car-image {
        width: 200px;
        height: 120px;
    }

    img {
        width: 200px;
        height: 120px;
    }

    .car-description p {
        font-size: 12px;
    }

    .car-description {
        width: 200px;
        text-align: center;
    }

    .btn-car {
        width: 200px;
    }

    .button-info {
        width: 50px;
        height: 35px;
    }
}

@media (max-width: 500px) {
    .card-car {
        width: 160px;
    }

    .car-image {
        width: 160px;
        height: 100px;
    }

    img {
        width: 160px;
        height: 100px;
    }

    .car-description {
        width: 160px;
    }

    .btn-car {
        width: 160px;
    }
}
</style>
