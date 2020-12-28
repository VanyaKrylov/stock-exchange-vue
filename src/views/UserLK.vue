<template>
  <div>
    <h1>Hello, User</h1>
    <h2 v-if="errors.length > 0">
      Errors:
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </h2>
    <h3>Capital is: {{ capital }}</h3>
    <form class="add-money" @submit.prevent="addMoney">
      <label for="sum">Add money</label>
      <input type="text" id="sum" placeholder="sum" v-model="inputCapital" />
      <button type="submit">Submit</button>
    </form>
    <h3>List of available stocks</h3>
    <table>
      <thead>
        <tr>
          <th>Company name</th>
          <th>Stock type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in availableStocks" :key="stock">
          <td>{{ stock.company.name }}</td>
          <td>{{ stock.type }}</td>
        </tr>
      </tbody>
    </table>
    <h3>List of owned stocks</h3>
    <table>
      <thead>
        <tr>
          <th>Company name</th>
          <th>Stock type</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in ownedStocks" :key="stock">
          <td>{{ stock.company.name }}</td>
          <td>{{ stock.type }}</td>
          <td>{{ stock.amount }}</td>
        </tr>
      </tbody>
    </table>
    <h3>Create an order</h3>
    <form class="create-order">
      <label for="size">Order size</label>
      <input type="text" id="size" placeholder="size" v-model="orderSize" />
      <label for="minPrice">Minimal price</label>
      <input
        type="text"
        id="minPrice"
        placeholder="sum"
        v-model="orderMinPrice"
      />
      <label for="maxPrice">Maximal price</label>
      <input
        type="text"
        id="maxPrice"
        placeholder="sum"
        v-model="orderMaxPrice"
      />
      <select v-model="orderCompany">
        <option
          v-for="company in companies"
          :key="company.id"
          v-bind:value="company.id"
          >{{ company.name }}</option
        >
      </select>
      <input type="button" value="Create Buy order" @click="buyOrder" />
      <input type="button" value="Create Sell order" @click="sellOrder" />
    </form>
    <h3>List of current orders</h3>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Size</th>
          <th>minPrice</th>
          <th>maxPrice</th>
          <th>Company name</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in currentOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.type }}</td>
          <td>{{ order.size }}</td>
          <td>{{ order.minPrice }}</td>
          <td>{{ order.maxPrice }}</td>
          <td>{{ order.company.name }}</td>
          <td>{{ order.timestamp }}</td>
        </tr>
      </tbody>
    </table>
    <h3>Orders to delete</h3>
    <form class="delete-orders" @submit.prevent="deleteOrders">
      <label for="id">Order id to delete</label>
      <input type="text" id="id" placeholder="id" v-model="orderToDeleteId" />
      <button type="submit">Delete</button>
    </form>
    <h3>Account management</h3>
    <form class="delete-account" @submit.prevent="deleteAccount">
      <button type="submit">Delete account</button>
    </form>
  </div>
</template>

<script>
import * as axios from "axios";

export default {
  name: "UserLK",
  data() {
    return {
      capital: "",
      errors: [],
      inputCapital: "",
      availableStocks: [],
      ownedStocks: [],
      orderSize: "",
      orderMinPrice: "",
      orderMaxPrice: "",
      orderCompany: "",
      currentOrders: [],
      orderToDeleteId: "",
      companies: []
    };
  },
  methods: {
    getCapital() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/user/lk/capital",
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
        });
    },
    getAvailableStocks() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/user/lk/available-stocks",
        headers: { Authorization: this.$store.state.token }
      })
        .then(response => {
          console.log(response);
          this.availableStocks = response.data;
        })
        .catch(e => {
          console.log(e);
          if (e.response.status === 401) {
            this.$store.commit("remove");
            this.$router.push("/");
          }
        });
    },
    getOwnedStocks() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/user/lk/owned-stocks",
        headers: { Authorization: this.$store.state.token }
      })
        .then(response => {
          console.log(response);
          this.ownedStocks = response.data;
        })
        .catch(e => {
          console.log(e);
          if (e.response.status === 401) {
            this.$store.commit("remove");
            this.$router.push("/");
          }
        });
    },
    getAllCompanies() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/company/all",
        headers: { Authorization: this.$store.state.token }
      })
        .then(response => {
          console.log(response);
          this.companies = response.data;
        })
        .catch(e => {
          console.log(e);
          if (e.response.status === 401) {
            this.$store.commit("remove");
            this.$router.push("/");
          }
        });
    },
    getAllCurrentOrders() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/user/lk/orders",
        headers: { Authorization: this.$store.state.token }
      })
        .then(response => {
          console.log(response);
          this.currentOrders = response.data;
        })
        .catch(e => {
          console.log(e);
          if (e.response.status === 401) {
            this.$store.commit("remove");
            this.$router.push("/");
          }
        });
    },
    addMoney() {
      axios({
        method: "patch",
        url: "http://localhost:8181/api/v0/user/lk/capital",
        headers: { Authorization: this.$store.state.token },
        data: {
          capital: this.inputCapital
        }
      })
        .then(response => {
          console.log(response.headers.authorization);
          this.inputCapital = "";
          this.updatePageInfo();
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.error);
        });
    },
    buyOrder() {
      axios({
        method: "patch",
        url: "http://localhost:8181/api/v0/user/lk/orders?buy",
        headers: { Authorization: this.$store.state.token },
        data: {
          size: this.orderSize,
          minPrice: this.orderMinPrice,
          maxPrice: this.orderMaxPrice,
          id: this.orderCompany
        }
      })
        .then(response => {
          console.log(response.headers.authorization);
          this.orderSize = "";
          this.orderMinPrice = "";
          this.orderMaxPrice = "";
          this.orderCompany = "";
          this.updatePageInfo();
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.error);
        });
    },
    sellOrder() {
      axios({
        method: "patch",
        url: "http://localhost:8181/api/v0/user/lk/orders?sell",
        headers: { Authorization: this.$store.state.token },
        data: {
          size: this.orderSize,
          minPrice: this.orderMinPrice,
          maxPrice: this.orderMaxPrice,
          id: this.orderCompany
        }
      })
        .then(response => {
          console.log(response.headers.authorization);
          this.orderSize = "";
          this.orderMinPrice = "";
          this.orderMaxPrice = "";
          this.orderCompany = "";
          this.updatePageInfo();
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.error);
        });
    },
    deleteOrders() {
      axios({
        method: "delete",
        url: "http://localhost:8181/api/v0/user/lk/orders",
        headers: { Authorization: this.$store.state.token },
        data: {
          orderId: this.orderToDeleteId
        }
      })
        .then(response => {
          console.log(response.headers.authorization);
          this.orderToDeleteId = "";
          this.updatePageInfo();
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.error);
        });
    },
    deleteAccount() {},
    updatePageInfo() {
      this.getCapital();
      this.getAvailableStocks();
      this.getOwnedStocks();
      this.getAllCompanies();
      this.getAllCurrentOrders();
      this.errors = [];
    }
  },
  created() {
    this.updatePageInfo();
  }
};
</script>

<style scoped></style>
