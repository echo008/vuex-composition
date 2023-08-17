# vuex-composition

[![npm version](https://badge.fury.io/js/vuex-composition.svg)](https://badge.fury.io/js/vuex-composition)

A util package to use Vuex with Composition API easily.

## Installation


```shell
$ npm install vuex-composition

$ yarn add vuex-composition

$ pnpm install vuex-composition
```

### Basic Usage Examples

```js
<script setup>
import { computed } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex-composition'

const { article, comments } = mapState(['article', 'comments'])
const { fullname } = mapGetters(['fullname'])
const { SET_USER_INFO } = mapMutations(['SET_USER_INFO'])
const { fetch } = mapActions(['fetch'])

// 设置用户信息
const userInfo = {}
SET_USER_INFO(userInfo)

// 请求数据
const url = ''
const params = {}
const getData = fetch(url, params)

// 响应式
const articleRef = computed(() => article)
const commentsRef = computed(() => comments)
const fullnameRef = computed(fullname)
</script>
```

### Reactive Usage Examples

```js
<script setup>
import { computed } from 'vue'
import { mapStateRefs, mapGettersRefs } from 'vuex-composition'

// 响应式
const { article, comments } = mapStateRefs(['article', 'comments'])
const { fullname } = mapGettersRefs(['fullname'])

// article => articleRef = computed(() => article)
// fullnameRef => computed(fullname)
</script>
```

### Full Usage Examples

```js
<script setup>
import { computed } from 'vue'
import { mapStoreRefs } from 'vuex-composition'

// 响应式
const { article, comments, fullname, SET_USER_INFO, fetch } = mapStoreRefs()
</script>
```

### Modules Usage Examples

```js
<script setup>
import { computed } from 'vue'
import { mapState, mapGetters, mapStateRefs, mapGettersRefs, mapMutations, mapActions } from 'vuex-composition'

const { article, comments } = mapState('common', ['article', 'comments'])
const { fullname } = mapGetters('common', ['fullname'])

const { article as articleRef, comments as commentsRef } = mapStateRefs('common', ['article', 'comments'])
const { fullname as fullnameRef } = mapGettersRefs('common', ['fullname'])

const { SET_USER_INFO } = mapMutations('common', ['SET_USER_INFO'])
const { fetch } = mapActions('common', ['fetch'])

// 设置用户信息
const userInfo = {}
SET_USER_INFO(userInfo)

// 请求数据
const url = ''
const params = {}
const getData = fetch(url, params)

// 响应式
const articleRef = computed(() => article)
const commentsRef = computed(() => comments)
const fullnameRef = computed(fullname)
</script>
```


### Namespaced Usage Examples

```js
<script setup>
import { createNamespacedHelpers } from 'vuex-composition'
const { mapState, mapGetters, mapStateRefs, mapGettersRefs, mapMutations, mapActions, mapStoreRefs } = createNamespacedHelpers('common')

const { article, comments } = mapState('common', ['article', 'comments'])
const { fullname } = mapGetters('common', ['fullname'])

const { article as articleRef, comments as commentsRef } = mapStateRefs('common', ['article', 'comments'])
const { fullname as fullnameRef } = mapGettersRefs('common', ['fullname'])
</script>
```

### useStore Usage Examples

> Consider separate the store composition file from the store usage inside the component

```js
<script setup>
import { useStore } from 'vuex'
import { createNamespacedHelpers } from 'vuex-composition';
import { mapState, mapGetters, mapStateRefs, mapGettersRefs, mapMutations, mapActions } from 'vuex-composition'

const store = useStore()

const { article, comments } = mapState(store, 'common', ['article', 'comments'])
const { fullname } = mapGetters(store, ['fullname'])

const { article as articleRef, comments as commentsRef } = mapStateRefs(store, ['article', 'comments'])
const { fullname as fullnameRef } = mapGettersRefs(store, 'common', ['fullname'])

const { SET_USER_INFO } = mapMutations(store, 'common', ['SET_USER_INFO'])
const { fetch } = mapActions(store, ['fetch'])

const { article, comments, fullname, SET_USER_INFO, fetch } = mapStoreRefs(store, 'common')

// 设置用户信息
const userInfo = {}
SET_USER_INFO(userInfo)

// 请求数据
const url = ''
const params = {}
const getData = fetch(url, params)

// 响应式
const articleRef = computed(() => article)
const commentsRef = computed(() => comments)
const fullnameRef = computed(fullname)
</script>
```

### If you like it, please star it
