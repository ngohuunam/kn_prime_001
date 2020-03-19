<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Orders</router-link> |
      <router-link to="/homev2">Ordersv2</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f7941d;
  /* width: 1280px; */
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 8px;
}

#nav {
  padding: 12px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #ffb860;
}

#nav a.router-link-exact-active {
  color: #f7941d;
}
</style>
