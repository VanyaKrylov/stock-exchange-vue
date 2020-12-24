<template>
  <div class="home">
    <button @click="routeToNewUser">Create new user</button><br>
    <button @click="routeToNewBroker">Create new broker</button><br>
    <button @click="routeToNewCompany">Create new company</button>
  </div>
</template>

<script>
export default {
  methods: {
    routeToNewUser: function() {
      this.$store.commit("set", "token: new User");
      this.$router.push("/new-user");
    },
    routeToNewBroker: function() {
      this.$store.state.token = "token: new broker";
      this.$router.push("/new-broker");
    },
    routeToNewCompany: function() {
      this.$store.state.token = "token: new company";
      this.$router.push("/new-company");
    }
  }
};
</script>

<!--<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>-->
