import { setActivePinia, createPinia } from "pinia"
import { test } from "vitest";
import { useCarStore } from "../../stores/car"

describe("userStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    test("User authentication", async () => {
        const carStore = useCarStore()
        expect(carStore.cars_info).toHaveLength(0)
        await carStore.getData()
        expect(carStore.cars_info).toHaveLength(!0)

    })
})