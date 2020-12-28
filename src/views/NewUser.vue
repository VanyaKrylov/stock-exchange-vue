<template>
  <div>
    <h1>Hello, new user</h1>
    <form class="new-user" @submit.prevent="newUser">
      <label for="name">Name</label>
      <input type="text" id="name" placeholder="Name" v-model="userName" />
      <label for="surname">Surname</label>
      <input type="text" id="surname" placeholder="Surname" v-model="surname" />
      <label for="capital">Money</label>
      <input type="text" id="capital" placeholder="Capital" v-model="capital" />
      <select v-model="broker">
        <option v-for="b in brokers" :key="b.id" v-bind:value="b">{{
          b.name + ":" + b.capital
        }}</option>
      </select>
      <input
        type="password"
        id="Password"
        placeholder="Password"
        v-model="password"
      />
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import * as axios from "axios";

export default {
  name: "NewUser",
  data: () => ({
    brokers: [],
    broker: "",
    userName: "",
    surname: "",
    capital: "",
    password: ""
  }),
  methods: {
    newUser() {
      axios({
        method: "post",
        url: "http://localhost:8181/sign-up/user",
        data: {
          name: this.userName,
          surname: this.surname,
          broker: this.broker,
          capital: this.capital,
          password: this.password
        }
      })
        .then(response => {
          console.log(response);
          this.$router.push("/");
        })
        .catch(e => {
          alert(e.response.data.error);
        });
    }
  },
  created() {
    axios
      .get("http://localhost:8181/api/v0/broker/all")
      .then(response => {
        this.brokers = response.data;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped></style>
