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
        expect(carStore.carsInfo).toHaveLength(0)
        await carStore.getData()
        const res = await axios.get(`https://testapi.io/api/dartya/resource/cardata`)
        const cars = carStore.carsInfo = await res.data.data
        const carLength = cars.length
        expect(carStore.carsInfo).toHaveLength(carLength)
    })
})