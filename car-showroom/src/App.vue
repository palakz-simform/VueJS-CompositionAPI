<template>
  <!-- Navigation Global Component -->
  <NavBar />
  <RouterView v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </RouterView>
  <carFooter />
</template>
  
<script>
import { RouterView } from "vue-router";
import carFooter from "./components/footer.vue"
export default {
  name: "App",
  components: {
    carFooter
  },
  created() {
    if (import.meta.env.VITE_MODE == "production") {
      console.log("You entered Production environment")
    }
    else if (import.meta.env.VITE_MODE == "staging") {
      console.log("You entered Staging environment")
    }
    else {
      console.log("Development environment")
    }
  }
}
</script>


<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(100px)
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translatey(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
