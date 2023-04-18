<template>
    <div class="home">
        <!-- Add Car Button -->
        <div class="add-car-button">
            <button class="button" @click="addCar()">Add Car</button>
        </div>

        <!-- Style applied when Add/Edit form is displayed -->
        <transition name="fade">
            <div class="modal-overlay" v-if="showModal"></div>
        </transition>

        <!-- Add/Edit Car Component -->
        <transition name="car-form">
            <carform v-if="showModal"></carform>
        </transition>

        <!-- gallery-card.vue component -->
        <div class="car-content">
            <transition-group class="car-card" name="car-card" tag="div" @before-enter="beforeEnter" @enter="enter"
                @before-leave="beforeLeave" @leave="leave" appear>
                <div v-for="(item, index) in carCardInfo" :key="item.id" :data-index="index">
                    <gallery_card :id="item.id" :name="item.name" :image="item.image" :description="item.details"
                        :price="item.price" />
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import carform from "../components/car-form.vue";
import gallery_card from "../components/gallery-card.vue";
import {
    useCarStore
} from "../stores/car";
import {
    mapActions,
    mapWritableState
} from "pinia";
import gsap from 'gsap'
export default {
    name: "HomePage",
    mounted() {
        this.getData(this.$route.params.id)
    },
    components: {
        carform,
        gallery_card
    },
    computed: {
        ...mapWritableState(useCarStore, ['carCardInfo', 'showModal'])
    },

    methods: {
        ...mapActions(useCarStore, ['getData', 'addCar']),

        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = 'translateY(100px)'
        },
        enter(el, done) {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                onComplete: done,
                delay: el.dataset.index * 0.1
            })
        },
        beforeLeave(el) {
            el.style.opacity = 1
        },
        leave(el, done) {
            gsap.to(el, {
                opacity: 0,
                x: -250,
                scaleY: 0.01,
                duration: 0.3,
                onComplete: done
            })
        }
    },

};
</script>

<style scoped>
.home {
    margin-bottom: 190px;
}

.car-content {
    display: flex;
    justify-content: center;
}

.car-card {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 15px;
    margin-bottom: 10px;
}

.add-car-button {
    display: flex;
    justify-content: end;
    padding: 20px;
    margin-right: 30px;

}

button {
    width: 100px;
    height: 35px;
    background-color: rgb(35, 177, 172);
    color: rgb(0, 0, 0);
    font-weight: bold;
    border: none;
    border-radius: 10px;
    font-size: 15px;
}

button:hover {
    background-color: transparent;
    color: rgb(35, 177, 172);
    border: 3px solid rgb(35, 177, 172);
}

.modal-overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease !important;
}

.car-card-leave-active {
    transition: all 0.5s ease;
    position: absolute;
}

.car-card-move {
    transition: all 0.5s ease;
}

.car-form-enter-active {
    animation: pop 0.5s;
}

.car-form-leave-active {
    animation: pop 0.5s reverse;
}

@keyframes pop {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

@media (max-width: 1880px) {
    .car-card {
        display: grid;
        grid-template-columns: auto auto auto auto;
        gap: 15px;
    }
}

@media (max-width: 1540px) {
    .car-card {
        display: grid;
        grid-template-columns: auto auto auto;
    }
}

@media (max-width: 1000px) {
    .car-card {
        display: grid;
        grid-template-columns: auto auto;
    }
}

@media (max-width: 800px) {

    .car-card {
        gap: 20px;
    }

    .add-car-button {
        display: flex;
        justify-content: end;
        padding: 20px;
        margin-right: 0px;
    }
}

@media (max-width: 690px) {

    .car-card {
        display: grid;
        grid-template-columns: auto auto;
        gap: 10px;
    }

    .add-car-button {
        display: flex;
        justify-content: end;
        padding: 20px;
        margin-right: 0px;
    }
}
@media (max-width:675px) {
  .car-card {
        display: grid;
        grid-template-columns: auto auto;
        gap: 30px;
    }

}

@media (max-width:550px) {
    .modal {
        max-width: 300px;
    }

    .car-card {
        display: grid;
        grid-template-columns: auto auto;
        gap: 15px;
    }
}
@media (max-width:400px) {
     .car-card {       
        gap: 10px;
    }
}
</style>
