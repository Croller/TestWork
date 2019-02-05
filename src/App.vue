<template>
  <div id="app">
    <div id="nav">
      <div id="nav-main">
        <router-link to="/">Home</router-link>
      </div>
      <router-link to="/table">Test 1</router-link>
      <!-- <router-link to="/test_1">Test 1</router-link> | -->
    </div>
    <router-view/>
  </div>
</template>
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  #nav-main {
    margin-bottom: 10px;
  }
}
</style>
