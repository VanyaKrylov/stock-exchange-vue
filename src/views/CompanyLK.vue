<template>
  <div>
    <div v-if="permitted">
      <h1>Hello, company</h1>
      <!--      <h2 v-if="errors.length > 0">
        Errors:
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </h2>-->
      <h3>Capital is: {{ capital }}</h3>
      <h3>Stocks</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in stocks" :key="stock">
            <td>{{ stock.type }}</td>
            <td>{{ stock.amount }}</td>
          </tr>
        </tbody>
      </table>
      <h3>Publish new stocks</h3>
      <form class="publish-new-stokcs" @submit.prevent="publishStocks">
        <select v-model="stockType">
          <option>COMMON</option>
          <option>PREFERRED</option>
        </select>
        <label for="size">Amount</label>
        <input
          type="text"
          name="amount"
          id="size"
          placeholder="size"
          v-model="stocksAmount"
        />
        <label for="price">Price</label>
        <input
          type="text"
          name="price"
          id="price"
          placeholder="sum"
          v-model="stocksPrice"
        />
        <button type="submit">Publish</button><br />
      </form>
    </div>
    <div v-if="permitted === false">
      <h1>403 Forbidden</h1>
    </div>
  </div>
</template>

<script>
import * as axios from "axios";

export default {
  name: "CompanyLK",
  data() {
    return {
      permitted: true,
      capital: "",
      stocks: [],
      errors: [],
      stockType: "",
      stocksAmount: "",
      stocksPrice: ""
    };
  },
  methods: {
    getCapital() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/company/lk/capital",
        headers: { Authorization: this.$store.state.token }
      })
        .then(response => {
          console.log(response);
          this.capital = response.data;
        })
        .catch(e => {
          console.log(e);
          if (e.response.status === 401) {
            this.$store.commit("remove");
            this.$router.push("/");
          }
          if (e.response.status === 403) {
            this.permitted = false;
          }
        });
    },
    getStocks() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/company/lk/published-stocks",
        headers: { Authorization: this.$store.state.token }
      })
        .then(response => {
          console.log(response);
          this.stocks = response.data;
        })
        .catch(e => {
          console.log(e);
          if (e.response.status === 401) {
            this.$store.commit("remove");
            this.$router.push("/");
          }
          if (e.response.status === 403) {
            this.permitted = false;
          }
        });
    },
    publishStocks() {
      axios({
        method: "post",
        url: "http://localhost:8181/api/v0/company/lk/company-stocks",
        headers: { Authorization: this.$store.state.token },
        data: {
          type: this.stockType,
          amount: this.stocksAmount,
          price: this.stocksPrice
        }
      })
        .then(response => {
          console.log(response.headers.authorization);
          this.stockType = "";
          this.stocksAmount = "";
          this.stocksPrice = "";
          this.updatePageInfo();
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.error);
          alert(err.response.data.error);
        });
    },
    updatePageInfo() {
      this.getCapital();
      this.getStocks();
      this.errors = [];
    }
  },
  created() {
    this.updatePageInfo();
  }
};
</script>

<style scoped></style>
