import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import Login from '../../views/LoginPage.vue'
import { setActivePinia, createPinia } from "pinia"

describe('Check email', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    test('set demo value of email', async () => {
        const wrapper = shallowMount(Login, {
            global: {
                mocks: {
                    $t: (message) => message,
                }
            }
        })

        const textInput = wrapper.find('input[type="email"]')
        await textInput.setValue('abc@gmail.com')
        expect(wrapper.find('input[type="email"]').element.value).toBe('abc@gmail.com')
    })
})
