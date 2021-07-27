<template>
  <div class="app">
    <form @submit.prevent="addData()">
      <input type="text" v-model="data.name" placeholder="Name">
      <input type="text" v-model=data.login placeholder="Login">
      <button type="submit">Create</button>
    </form>
    <div class="app__data" v-for="(el,index) in DATA"
         :key="index"
         :el="el">
      <div class="infoData" style="display: flex">
        <p>Name:</p>
        <p v-if="!el.isShowChangeCard">{{ el.name }}</p>
        <input style="height: 25px" v-if="el.isShowChangeCard" v-model="changesData.name">
      </div>
      <div class="infoData" style="display: flex">
        <p>Login:</p>
        <p v-if="!el.isShowChangeCard">{{ el.login }}</p>
        <input style="height: 25px" v-if="el.isShowChangeCard" v-model="changesData.login">
      </div>
      <button class="btnData" @click="deleteData(index)">Delete</button>
      <button class="btnData" v-if="!el.isShowChangeCard" @click="changeData(index, el)">Change</button>
      <button class="btnData" v-if="el.isShowChangeCard" @click="updateData(index, el)">Update</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'App',
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
      if (this.DATA[index].id) {
        this.DELETE_DATA_FROM_API(index);
      } else console.log('NOT Id')
    },
    changeData(index, el) {
      this.changesData.name = el.name;
      this.changesData.login = el.login;
      el.isShowChangeCard = !el.isShowChangeCard;
    },
    updateData(index, el) {
      if (this.changesData.name && this.changesData.login) {
        let name = this.changesData.name;
        let login = this.changesData.login;
        this.CHANGE_DATA_FROM_API({name, login, index})
            .then(() => {
              //this.changesData.name = this.changesData.login = '';
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
  margin: 10px;

  form {
    margin-bottom: 20px;
  }

  &__data {
    margin: 0 5px;
    border: 1px $border-color;
    border-style: solid none;
  }
}

.infoData {
  margin: 5px;

  p {
    height: 21px;
    margin: 4px 5px 0 5px;
    color: $text-color;
  }
}

.btnData {
  margin: 1px 3px 5px 3px;
}
</style>
