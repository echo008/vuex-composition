import { mapGetters, mapState } from '../../index'

export default {
  template: `<div></div>`,
  setup () {
    const state = mapState(['name', 'userInfo'])
    const getters = mapGetters(['helloName', 'helloUser'])
    return {
      state,
      getters,
      getName () {
        return 'test'
      }
    }
  }
}
