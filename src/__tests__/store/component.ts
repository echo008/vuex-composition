import { mapGetters, mapState, mapStateRefs } from '../../index'

export default {
  template: `<div></div>`,
  setup () {
    const { name, userInfo } = mapStateRefs(['name', 'userInfo'])
    const state = mapState(['name', 'userInfo'])
    const getters = mapGetters(['helloName', 'helloUser'])
    return {
      name,
      userInfo,
      state,
      getters,
      getName () {
        return 'test'
      }
    }
  }
}
