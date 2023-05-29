import { describe, expect, test } from "vitest";
import NotFound from '../../views/NotFound.vue'
import { shallowMount } from '@vue/test-utils'
describe('NotFound.vue', () => {
    test('renders inner text', () => {
        const wrapper = shallowMount(NotFound, {
            global: {
                mocks: {
                    $t: (message) => message,
                }
            }

        })
        expect(wrapper.text()).toContain('Page Not Found');  //The asertion we are making is we expect the text to contain about.
    })
});