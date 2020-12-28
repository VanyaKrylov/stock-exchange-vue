<template>
  <div>
    <h1>Create new company</h1>
    <form class="create-company" @submit.prevent="submitNew">
      <label for="name">Name</label>
      <input type="text" id="name" placeholder="Name" v-model="companyName" />
      <label for="capital">Capital</label>
      <input type="text" id="capital" placeholder="sum" v-model="capital" />
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
  name: "NewCompany",
  data() {
    return {
      companyName: "",
      capital: "",
      password: ""
    };
  },
  methods: {
    submitNew() {
      axios({
        method: "post",
        url: "http://localhost:8181/sign-up/company",
        data: {
          name: this.companyName,
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
