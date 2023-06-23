import { shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from "pinia"
import GalleryCard from '../GalleryCard.vue'
import Home from '../../views/Home.vue'
import axios from 'axios'
import { expect } from 'vitest';
import { useCarStore } from '../../stores/car'
describe('Home.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    test('renders list of cars', async () => {
        const carStore = useCarStore()
        const res = await axios.get(`https://testapi.io/api/dartya/resource/cardata`)
        const cars = carStore.carsInfo = await res.data.data
        const carLength = cars.length

        const component = shallowMount(Home, {
            global: {
                mocks: {
                    $t: (message) => message,
                }
            }
        })

        const items = component.findAllComponents(GalleryCard)
        expect(items).toHaveLength(carLength)
        items.forEach((wrapper, i) => {
            expect(wrapper.props().name).toStrictEqual(cars[i].name)
        })
    })
})