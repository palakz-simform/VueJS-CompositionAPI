import GalleryCard from "../../components/GalleryCard.vue"
import { shallowMount } from "@vue/test-utils"
import { expect } from "vitest"
import { setActivePinia, createPinia } from "pinia"

describe('GalleryCard.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    test('display name from props', () => {
        const name = "test"
        const wrapper = shallowMount(GalleryCard, {
            propsData: {
                name,
            }
        })
        const heading = wrapper.find('.heading')
        expect(heading.text()).toContain(name);
    })
})
