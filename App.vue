<template>
  <div class="app">
    <form @submit.prevent="addData()">
      <input type="text" v-model="data.name" placeholder="Name">
      <input type="text" v-model=data.login placeholder="Login">
      <button type="submit">Create</button>
    </form>
    <div v-for="(el,index) in DATA"
         :key="index"
         :el="el">
      <div style="display: flex">
        <p>Name:</p>
        <p v-if="!el.isShowChangeCard">{{ el.name }}</p>
        <input style="height: 25px" v-if="el.isShowChangeCard" v-model="changesData.name">
      </div>
      <div style="display: flex">
        <p>Login:</p>
        <p v-if="!el.isShowChangeCard">{{ el.login }}</p>
        <input style="height: 25px" v-if="el.isShowChangeCard" v-model="changesData.login">
      </div>
      <button @click="deleteData(index)">Delete</button>
      <button v-if="!el.isShowChangeCard" @click="changeData(index, el)">Change</button>
      <button v-if="el.isShowChangeCard" @click="updateData(index, changesData, el)">Update</button>
      <ChangeData
          :data-from-app="el"
          v-if="false"
      ></ChangeData>
      <hr>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import ChangeData from "./components/ChangeData";

export default {
  name: 'App',
  components: {ChangeData},
  data() {
    return {
      data: {
        name: '',
        login: ''
      },
      changesData: {
        name: '',
        login: ''
      }
    }
  },
  mounted() {
    this.GET_DATA_FROM_API()
  },
  methods: {
    ...mapActions(['GET_DATA_FROM_API', 'ADD_DATA_TO_API', 'DELETE_DATA_FROM_API', 'CHANGE_DATA_FROM_API']),
    addData() {
      if (this.data.name && this.data.login) {
        this.ADD_DATA_TO_API(this.data)
            .then(() => this.data.name = this.data.login = '')
      } else console.log("NOT")
    },
    deleteData(index) {
      this.DELETE_DATA_FROM_API(index);
    },
    changeData(index, el) {
      this.changesData.name = el.name;
      this.changesData.login = el.login;
      el.isShowChangeCard = !el.isShowChangeCard;
    },
    updateData(index, changesData, el) {
      if (changesData.name && changesData.login) {
        this.CHANGE_DATA_FROM_API({changesData, index})
        .then(() => {
          el.isShowChangeCard = !el.isShowChangeCard;
        })
      }
    }

  },
  computed: {
    ...mapState(['DATA']),
  },
}
</script>

<style lang="scss">
@import "assets/scss/variables.scss";
@import "assets/scss/style.scss";

.app {

}

</style>
