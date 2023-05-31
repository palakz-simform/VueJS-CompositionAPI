import { setActivePinia, createPinia } from "pinia"
import { test } from "vitest";
import { useCarStore } from "../../stores/car"
import axios from "axios";
describe("userStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    test("User authentication", async () => {
        const carStore = useCarStore()
        expect(carStore.cars_info).toHaveLength(0)
        await carStore.getData()
        const res = await axios.get(`https://testapi.io/api/dartya/resource/cardata`)
        const cars = carStore.cars_info = await res.data.data
        const car_length = cars.length
        expect(carStore.cars_info).toHaveLength(car_length)
    })
})