<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
   provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.h1, .h2, .h3, h1, h2, h3 {
    margin-top: 0;
    margin-bottom: 0;
}
body,html{
  width: 100%;
  height: 100%;

}
@media (min-width:200px ) and (max-width:768px ) {
  #app{font-size: 0.5rem;}
}
</style>
