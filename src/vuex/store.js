import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    actions: {
        //commit - совершать, совершать
        GET_DATA_FROM_API({commit}) {
            axios
                .get('http://localhost:3000/users')
                .then(response => {
                    commit('SET_DATA', response.data)
                })
        },

        ADD_DATA_TO_API({commit}, data) {
            return axios
                .post('http://localhost:3000/users', data)
                .then(() => {
                    commit('ADD_DATA', data)
                })
        },

        DELETE_DATA_FROM_API({commit}, index) {
            let idData = this.state.DATA[index].id;
            axios.delete(`http://localhost:3000/users/${idData}`)
                .then((response) => {
                    console.log(response.data);
                    commit('DELETE_DATA', index)
                })
            /* Большой массив данных
            {
      "name": "Liam",
      "login": "liam$5",
      "id": "lpgmxtN"
    },
    {
      "name": "Tony",
      "login": "Totyy2r_E",
      "id": "ZKn5qXE"
    },
    {
      "name": "Sara",
      "login": "sara_HHH",
      "id": "JWCvqvi"
    },
    {
      "name": "Dandy",
      "login": "dandy_*$",
      "id": "u0SS2H0"
    },
    {
      "name": "Ronny",
      "login": "Ron@DOG",
      "id": "9out4CW"
    },
    {
      "name": "Kol",
      "login": "Kol_kll",
      "id": "TO7REs6"
    }*/
        },

        CHANGE_DATA_FROM_API({commit}, {name, login, index}) {
            let idData = this.state.DATA[index].id;
            console.log(idData)
            axios.patch(`http://localhost:3000/users/${idData}`, {name, login})
                .then((response) => {
                    console.log(response);
                    commit('CHANGE_DATA', {index, name, login});
                })
        }

    },
    mutations: {
        SET_DATA(state, data) {
            state.DATA = data;
        },
        ADD_DATA(state, data) {
            state.DATA.push({name: data.name, login: data.login});
        },
        DELETE_DATA(state, index) {

            state.DATA.splice(index, 1);
        },
        CHANGE_DATA(state, {index, name, login}) {
            console.log(state.DATA[index]);
            state.DATA[index].name = name;
            state.DATA[index].login = login;
        }
    },
    state: {
        DATA: []
    },
    getters: {
        DATA_GET(state) {
            return state.DATA;
        }
    }
})

export default store;