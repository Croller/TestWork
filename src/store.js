import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test_1: {
      ships: Array,
      ship: Array,
      pageCurr: 1,
    },
  },
  getters: {
    ships(state) {
      return state.test_1.ships;
    },
    ship(state) {
      return state.test_1.ship;
    },
    page(state) {
      return state.test_1.pageCurr;
    },
  },
  mutations: {
    SET_SHIPS(state, ships) {
      state.test_1.ships = ships;
    },
    SET_SHIP(state, ship) {
      state.test_1.ship = ship;
    },
    SET_PAGE(state, page) {
      state.test_1.pageCurr = page;
    },
  },
  actions: {
    loadShips({ commit }, page) {
      axios
        .get(`https://swapi.co/api/starships/?page=${page}`)
        .then(r => r.data)
        .then((ships) => {
          commit('SET_SHIPS', ships);
        });
    },
    searchShips({ commit }, name) {
      axios
        .get(`https://swapi.co/api/starships/?search=${name}`)
        .then(r => r.data)
        .then((ships) => {
          commit('SET_SHIPS', ships);
        });
    },
    infoShip({ commit }, id) {
      axios
        .get(`https://swapi.co/api/starships/${id}/`)
        .then(r => r.data)
        .then((ship) => {
          commit('SET_SHIP', ship);
        });
    },
  },
});
