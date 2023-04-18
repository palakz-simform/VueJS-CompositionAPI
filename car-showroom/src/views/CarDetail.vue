<template>
    <div>
        <div class="back">
            <button @click.prevent="home()"><i class="fa-solid fa-arrow-left-long"></i>Back</button>
        </div>
        <div class="car-detail">
            <div class="image">
                <img :src="carDetailInfo.image">
            </div>
            <div class="info">
                <div class="title">
                    <h1>{{ carDetailInfo.name }}</h1>
                </div>
                <div class="description">
                    <h3>Description of Car : </h3>
                    <p>{{ carDetailInfo.details }}</p>
                </div>
                <div class="price">
                    <h3>Price of Car : </h3>
                    <p>Rs. {{ carDetailInfo.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCarStore } from '../stores/car'

export default {
    name: 'CarDetail',
    mounted() {
        this.getCarDetail(this.$route.params.id)
    },
    methods: {
        ...mapActions(useCarStore, ['getCarDetail']),
        home() {
            this.$router.push({
                name: 'home'
            })
        }
    },
    computed: {
        ...mapState(useCarStore, ['carDetailInfo']),
    }
}
</script>

<style scoped>
button {
    margin-top: 30px;
    margin-left: 30px;
    color: rgb(255, 255, 255);
    background-color: rgb(35, 177, 172);
    border-radius: 10px;
    border: none;
    height: 40px;
    width: 100px;
    cursor: pointer;
}

button:hover {
    background-color: transparent;
    color: rgb(35, 177, 172);
    font-weight: bolder;
    border: 3px solid rgb(35, 177, 172);
}

i {
    margin-right: 15px;
}

.car-detail {
    margin: auto;
    margin-top: 50px;
    margin-bottom: 120px;
    height: 500px;
    box-shadow: 0px 1px 10px;
    max-width: 1200px;
    display: flex;
    box-shadow: 6px 8px 20px 0 rgba(47, 243, 237, 0.7);
    border-radius: 15px;
    border-left: 1px solid rgb(35, 177, 172);
    border-top: 1px solid rgb(35, 177, 172);
}

.info {
    margin-top: 20px;
}

.image {
    max-width: 500px;
    align-self: center;
}

img {
    width: 500px;
    margin-left: 20px;
}

.title {
    width: 700px;
    height: 100px;
}

.title h1 {
    color: rgb(255, 255, 255);
    margin-right: 30px;
}

.description {
    padding-left: 80px;
    height: 150px;
}

.description h3 {
    color: rgb(35, 177, 172);
    font-size: 25px;
}

.description p {
    color: white;
    font-size: 18px;
}

.price {
    padding-left: 80px;
}

.price h3 {
    color: rgb(35, 177, 172);
    font-size: 25px;
}

.price p {
    font-size: 18px;
    color: white;
}

@media (max-width:1500px) {

    .car-detail {

        height: 500px;
        box-shadow: 0px 1px 10px;
        max-width: 800px;
        display: flex;;
        box-shadow: 5px 8px 10px 0 rgba(47, 243, 237, 0.7);

    }

    .image {
        max-width: 400px;
        align-self: center;

    }

    img {
        width: 100%;
    }

    .title {

        max-width: 400px;
        height: 100px;
    }

    .description {
        padding-right: 10px;
        height: 150px
    }

    .price {

        height: 100px;
    }

    @media(max-width: 810px) {

        .car-detail {
            margin-left: 20px;
            margin-right: 30px;
            flex-direction: column;
            height: 700px;
            display: flex;

        }

        .image {
            max-width: 400px;
            align-self: center;
            padding-top: 20px;
            ;

        }

        img {
            margin-left: 13px;
            margin-right: 10px;
            width: 90%
        }

        .title {

            max-width: 100%;
            height: 70px;
        }

        .description {
            padding-left: 40px;
            height: 150px
        }

        .price {
            padding-left: 40px;
            height: 50px;
        }
    }

}
</style>
