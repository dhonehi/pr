<template>
  <div class="app">
    <form  @submit.prevent="addData()">
      <input type="text" v-model="data.name" placeholder="Name">
      <input type="text" v-model=data.login placeholder="Login">
      <button type="submit">Create</button>
    </form>
    <div v-for="(el,index) in DATA_GET"
         :key="index"
         :el="el">
      <p>Name: {{ el.name }}</p>
      <p>Login: {{ el.login }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      data: {
        name: '',
        login: ''
      }
    }
  },
  mounted() {
    this.GET_DATA_FROM_API()
  },
  methods: {
    ...mapActions(['GET_DATA_FROM_API', 'ADD_DATA_TO_API']),
    addData() {
      this.ADD_DATA_TO_API(this.data);
      this.data.name = this.data.login = '';
    }
  },
  computed: {
    ...mapGetters(['DATA_GET']),
    ...mapState(['DATA'])
  }
}
</script>

<style lang="scss">
@import "assets/scss/variables.scss";
@import "assets/scss/style.scss";

.app {

}

</style>
