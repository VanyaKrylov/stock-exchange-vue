<template>
  <div>
    <h1>Hello, new user</h1>
    <h1>{{ this.$store.state.token }}</h1>
    <ul>
      <li v-for="broker in brokers" :key="broker">{{ broker.name + ':' + broker.capital }}</li>
    </ul>
  </div>
</template>

<script>
import * as axios from "axios";

export default {
  name: "NewUser",
  data: () => ({
    brokers: []
  }),
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
