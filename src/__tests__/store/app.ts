import { mount } from '@vue/test-utils'
import store from './store'

export default (App) => {
  return mount(App, {
    global: {
      plugins: [store]
    }
  })
}
