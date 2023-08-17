import { toRef, reactive, isReactive, computed } from 'vue'
import * as Vuex from 'vuex'

let storeKey
let reactiveValue = true

const isObject = (val) => val !== null && typeof val === 'object'

const normalizeNamespace = (namespace) => {
  if (typeof namespace !== 'string') {
    namespace = ''
  } else if (namespace.charAt(namespace.length - 1) !== '/') {
    namespace += '/'
  }
  return namespace
}

const toReactive = (val) => isObject(val) ? isReactive(val) ? val : reactive(val) : toRef(val)

const mapHooks = {
  mapStateRefs: reactiveValue ? toReactive : toRef,
  mapGettersRefs: computed
}

const mapRefs = {
  mapStateRefs: 'mapState',
  mapGettersRefs: 'mapGetters'
}

const mapStore = (name, store, namespace, map) => {
  if (!(store instanceof Vuex.Store)) {
    if (store) {
      map = namespace
      namespace = store
    }
    store = Vuex.useStore(storeKey)
  }
  const params = namespace ? [namespace, map] : [map]
  return new Proxy(Vuex[mapRefs[name] || name](...params), {
    get: function (target, propertyKey, receiver) {
      const rawValue = Reflect.get(target, propertyKey, receiver)
      if (rawValue === void 0) return rawValue
      const value = rawValue[name === 'mapState' ? 'call' : 'bind']({ $store: store })
      return mapHooks[name] ? mapHooks[name](value) : value
    }
  })
}
export const mapState = mapStore.bind(null, 'mapState')
export const mapGetters = mapStore.bind(null, 'mapGetters')
export const mapMutations = mapStore.bind(null, 'mapMutations')
export const mapActions = mapStore.bind(null, 'mapActions')
export const mapStateRefs = mapStore.bind(null, 'mapStateRefs')
export const mapGettersRefs = mapStore.bind(null, 'mapGettersRefs')

export const mapStoreRefs = (store, namespace) => {
  if (!(store instanceof Vuex.Store)) {
    if (store) namespace = store
    store = Vuex.useStore(storeKey)
  }
  const module = store._modulesNamespaceMap[normalizeNamespace(namespace)]
  if (!module) return
  const rawModule = module._rawModule
  return [
    ['state', mapStateRefs],
    ['getters', mapGettersRefs],
    ['mutations', mapMutations],
    ['actions', mapActions]
  ].reduce((hooks, [name, nameHooks]) => ({ ...hooks, ...nameHooks(store, namespace, Object.keys(rawModule[name])) }), {})
}

export const createNamespacedHelpers = (...options) => ({
  mapState: mapState.bind(null, ...options),
  mapGetters: mapGetters.bind(null, ...options),
  mapMutations: mapMutations.bind(null, ...options),
  mapActions: mapActions.bind(null, ...options),
  mapStateRefs: mapStateRefs.bind(null, ...options),
  mapGettersRefs: mapGettersRefs.bind(null, ...options),
  mapStoreRefs: mapStoreRefs.bind(null, ...options)
})

export const setStoreKey = (key) => storeKey = key

export const setReactive = (value) => reactiveValue = value
