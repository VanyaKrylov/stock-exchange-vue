<template>
  <div id="app">
    <div v-if="$router.currentRoute.path === '/'">
      <h1>hi!</h1>
      <button type="button" @click="signUp">Sign Up</button>
    </div>
    <br />
    <router-view></router-view>
    <br />
    <button type="button" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    token: ""
  }),
  methods: {
    signUp() {
      this.$router.push("/home");
    },
    logout() {
      this.$store.commit("remove");
      this.$router.push("/");
    }
  }
};
</script>

<!--<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>-->
