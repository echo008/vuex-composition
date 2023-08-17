import { describe, it, expect } from 'vitest'

import createApp from './store/app'
import App from './store/component'

describe('Vuex-composition', () => {
  const wrapper = createApp(App)
  it('test data', () => {
    expect(wrapper.getComponent(App).componentVM.getName()).toEqual('test')
  })
  it('test state name', () => {
    expect(wrapper.getComponent(App).componentVM.state.name).toEqual('vuex')
  })
  it('test state userInfo', () => {
    expect(wrapper.getComponent(App).componentVM.state.userInfo.name).toEqual('vuex-composition')
  })
  it('test getters name', () => {
    expect(wrapper.getComponent(App).componentVM.getters.helloName()).toEqual('hello vuex')
  })
  it('test getters userInfo', () => {
    expect(wrapper.getComponent(App).componentVM.getters.helloUser()).toEqual('hello user vuex-composition')
  })
})
