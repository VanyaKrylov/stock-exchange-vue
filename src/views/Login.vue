<template>
  <form class="login-form" @submit.prevent="login">
    <div class="form-group">
      <input
        type="text"
        id="username"
        placeholder="Username"
        v-model="username"
      />
      <label for="username">Username</label>
    </div>
    <div class="form-group">
      <input
        type="password"
        id="Password"
        placeholder="Password"
        v-model="password"
      />
      <label for="Password">Password</label>
    </div>
    <input type="submit" value="Login" />
  </form>
</template>

<script>
import * as axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8181/login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response.headers.authorization);
          this.$router.push(response.data.location.slice(6));
          this.$store.commit("set", response.headers.authorization);
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
