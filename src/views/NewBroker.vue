<template>
  <div>
    <h1>Create new broker</h1>
    <form class="new-broker-form" @submit.prevent="createNewBroker">
      <label>Name</label>
      <input v-model="name" />
      <label>Fee</label>
      <input v-model="fee" />
      <label>Capital</label>
      <input v-model="capital" />
      <input
        type="password"
        id="Password"
        placeholder="Password"
        v-model="password"
      />
      <label for="Password">Password</label>
      <input type="submit" value="Create" />
    </form>
    <p v-if="errors.length > 0">{{ errors }}</p>
  </div>
</template>

<script>
import * as axios from "axios";

export default {
  name: "NewBroker",
  data() {
    return {
      name: "",
      fee: "",
      capital: "",
      password: "",
      errors: ""
    };
  },
  methods: {
    createNewBroker: function() {
      axios({
        method: "post",
        url: "http://localhost:8181/sign-up/broker",
        data: {
          name: this.name,
          fee: this.fee,
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
  }
};
</script>

<style scoped></style>
