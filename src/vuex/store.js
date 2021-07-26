import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    actions: {
        //commit - совершать, совершать
        GET_DATA_FROM_API({commit}) {
            return axios
                .get('http://localhost:3000/users')
                .then(response => {
                    commit('SET_DATA', response.data)
                })
        },
        ADD_DATA_TO_API({commit}, data) {
            if (data.name!=='' && data.login!=='') {
                console.log('ADD_DATA_TO_API');
                axios
                    .post('http://localhost:3000/users', data)
                    .then(() => commit('ADD_DATA', data))
            }
        }
    },
    mutations: {
        SET_DATA(state, data) {
            state.DATA = data;
        },
        ADD_DATA(state, data) {
            if (data.length) {
                state.DATA.push(data);
            }
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