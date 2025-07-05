<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  created() {
    // 页面刷新时恢复菜单数据
    this.$store.dispatch('initMenu');
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>