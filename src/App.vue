<template>
  <RouterView />
</template>

<script>
import { getBooks } from '/@/composition/store'
import { onMounted } from 'vue'

export default {
  setup () {
    onMounted(() => { getBooks() })
    return {
    }
  }
}
</script>

<style lang="scss">
@import './style/all.scss';
</style>