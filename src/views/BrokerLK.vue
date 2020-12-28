<template>
  <div>
    <h1>Hello Broker</h1>
    <h2 v-if="errors.length > 0">
      Errors:
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </h2>
    <h3>Capital is: {{ capital }}</h3>
    <h3>Available company stocks</h3>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Size</th>
          <th>Price</th>
          <th>Company name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in stocks" :key="stock.id">
          <td>{{ stock.id }}</td>
          <td>{{ stock.size }}</td>
          <td>{{ stock.minPrice }}</td>
          <td>{{ stock.company.name }}</td>
        </tr>
      </tbody>
    </table>
    <h3>Buy company stocks</h3>
    <form class="buy-company-stocks" @submit.prevent="buyCompanyStocks">
      <label for="id">Order id</label>
      <input type="text" placeholder="id" id="id" v-model="orderId" />
      <label for="size">Amount</label>
      <input type="text" placeholder="size" id="size" v-model="orderSize" />
      <input type="submit" value="Buy" />
    </form>
    <h3>Owned stocks</h3>
    <table>
      <thead>
        <tr>
          <th>Company name</th>
          <th>Stock type</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in ownedStocks" :key="stock.company.name">
          <td>{{ stock.company.name }}</td>
          <td>{{ stock.type }}</td>
          <td>{{ stock.amount }}</td>
        </tr>
      </tbody>
    </table>
    <h3>Pending clients orders</h3>
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
        <tr v-for="order in clientOrders" :key="order.id">
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
    <h3>Manage clients orders</h3>
    <form class="manage-client-orders">
      <label for="idd">Order id</label>
      <input
        type="text"
        name="orderId"
        id="idd"
        placeholder="id"
        v-model="clientOrderId"
      />
      <label for="amount">Amount</label>
      <input
        type="text"
        name="size"
        id="amount"
        placeholder="size"
        v-model="clientOrderSize"
      />
      <label for="price">Price</label>
      <input
        type="text"
        name="price"
        id="price"
        placeholder="sum"
        v-model="clientOrderPrice"
      />
      <input
        type="button"
        name="buy"
        value="Buy orders"
        @click="buyClientOrders"
      />
      <input
        type="button"
        name="sell"
        value="Sell orders"
        @click="sellClientOrders"
      />
    </form>
    <form class="publish-client-orders" @submit.prevent="publishClientOrders">
      <label for="orderId">Order id</label>
      <input
        type="text"
        name="orderId"
        id="orderId"
        placeholder="id"
        v-model="clientOrderToPublishId"
      />
      <button type="submit">Publish</button>
    </form>
  </div>
</template>

<script>
import * as axios from "axios";

export default {
  name: "BrokerLK",
  data() {
    return {
      errors: [],
      capital: "",
      stocks: [],
      orderId: "",
      orderSize: "",
      ownedStocks: [],
      clientOrders: [],
      clientOrderId: "",
      clientOrderSize: "",
      clientOrderPrice: "",
      clientOrderToPublishId: ""
    };
  },
  methods: {
    buyCompanyStocks() {
      axios({
        method: "post",
        url: "http://localhost:8181/api/v0/broker/lk/company-stocks",
        headers: { Authorization: this.$store.state.token },
        data: {
          id: this.orderId,
          size: this.orderSize
        }
      })
        .then(response => {
          console.log(response.headers.authorization);
          this.orderId = "";
          this.orderSize = "";
          this.updatePageInfo();
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.error);
        });
    },
    buyClientOrders() {
      axios({
        method: "patch",
        url: "http://localhost:8181/api/v0/broker/lk/client-orders?buy",
        headers: { Authorization: this.$store.state.token },
        data: {
          orderId: this.clientOrderId,
          size: this.clientOrderSize,
          price: this.clientOrderPrice
        }
      })
        .then(response => {
          console.log(response.headers.authorization);
          this.clientOrderId = "";
          this.clientOrderSize = "";
          this.clientOrderPrice = "";
          this.updatePageInfo();
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.error);
        });
    },
    sellClientOrders() {
      axios({
        method: "patch",
        url: "http://localhost:8181/api/v0/broker/lk/client-orders?sell",
        headers: { Authorization: this.$store.state.token },
        data: {
          orderId: this.clientOrderId,
          size: this.clientOrderSize,
          price: this.clientOrderPrice
        }
      })
        .then(response => {
          console.log(response.headers.authorization);
          this.clientOrderId = "";
          this.clientOrderSize = "";
          this.clientOrderPrice = "";
          this.updatePageInfo();
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.error);
        });
    },
    publishClientOrders() {
      axios({
        method: "patch",
        url: "http://localhost:8181/api/v0/broker/lk/client-orders?publish",
        headers: { Authorization: this.$store.state.token },
        data: {
          orderId: this.clientOrderToPublishId
        }
      })
        .then(response => {
          console.log(response.headers.authorization);
          this.clientOrderToPublishId = "";
          this.updatePageInfo();
          //handle response and save JWT
        })
        .catch(err => {
          console.log(err);
          this.errors.push(err.response.data.error);
        });
    },
    getCapital() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/broker/lk/capital",
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
    getStocks() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/broker/lk/available-stocks",
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
        });
    },
    getOwnedStocks() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/broker/lk/owned-stocks",
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
    getClientOrders() {
      axios({
        method: "get",
        url: "http://localhost:8181/api/v0/broker/lk/client-orders",
        headers: { Authorization: this.$store.state.token }
      })
        .then(response => {
          console.log(response);
          this.clientOrders = response.data;
        })
        .catch(e => {
          console.log(e);
          if (e.response.status === 401) {
            this.$store.commit("remove");
            this.$router.push("/");
          }
        });
    },
    updatePageInfo() {
      this.getCapital();
      this.getStocks();
      this.getOwnedStocks();
      this.getClientOrders();
      this.errors = [];
    }
  },
  created() {
    this.updatePageInfo();
  }
};
</script>

<style scoped></style>
