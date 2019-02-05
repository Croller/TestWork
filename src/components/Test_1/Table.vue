<template>
  <div class="test_1">
    <div class="table-nav">
      <span class="controlPage" @click="prevPage()" v-show="searchName.length == 0">Prev</span>
      <span class="searchInput">
        <input type="text" v-model="searchName"/>
      </span>
      <span class="controlPage" @click="nextPage()" v-show="searchName.length == 0">Next</span>
    </div>
    <table class="table" v-if="shipsData != null">
      <thead>
        <tr>
          <th>name</th>
          <th>model</th>
          <th>manufacture</th>
          <th>length</th>
          <th>crew</th>
          <th>pilots</th>
          <th>created</th>
          <th>cost_in_credits</th>
          <th>consumables</th>
          <th>passengers</th>
          <th>starship_class</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(ship, index) in shipsData.results" :key="index" @click="routeInfo(ship.url)">
          <td>{{ ship.name }}</td>
          <td>{{ ship.model }}</td>
          <td>{{ ship.manufacturer }}</td>
          <td>{{ ship.length }}</td>
          <td>{{ ship.crew }}</td>
          <td>{{ ship.pilots.length }}</td>
          <td>{{ ship.created }}</td>
          <td>{{ ship.cost_in_credits }}</td>
          <td>{{ ship.consumables }}</td>
          <td>{{ ship.passengers }}</td>
          <td>{{ ship.starship_class }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'test_1',
  props: {
    msg: String,
  },
  data() {
    return {
      searchName: '',
    };
  },
  computed: {
    ...mapState({
      state: 'test_1',
    }),
    shipsData() {
      if ('results' in this.$store.getters.ships) {
        return this.$store.getters.ships;
      }
      return null;
    },
    page() {
      return this.$store.getters.page;
    },
  },
  mounted() {
    if ('search' in this.$route.query) {
      this.searchName = this.$route.query.search;
    } else {
      this.$store.dispatch('loadShips', this.page);
    }
  },
  methods: {
    prevPage() {
      if (this.page > 1) {
        const page = this.page - 1;
        this.$store.commit('SET_PAGE', page);
      }
    },
    nextPage() {
      const page = this.page + 1;
      this.$store.commit('SET_PAGE', page);
    },
    routeInfo(url) {
      const id = url.split('/')[url.split('/').length - 2];
      this.$router.push(`/info/ship/${id}`);
    },
  },
  watch: {
    page(newVal) {
      this.$store.dispatch('loadShips', newVal);
    },
    searchName(newVal) {
      const self = this;
      setTimeout(() => {
        self.$store.dispatch('searchShips', newVal);
      }, 1500);
    },
  },
};
</script>

<style scoped lang="stylus">
.test_1
  .table-nav
    display flex
    justify-content space-between
    width 100%
    margin-bottom 15px

    .searchInput
      margin auto
    .controlPage
      cursor pointer
      margin 0 15px

  table
    width 100%
    border-spacing 0px

  thead
    tr
      th
        padding 2px
        border-bottom 3px solid #F5F5F5
        border-right 1px solid #F5F5F5
        border-top 3px solid #F5F5F5

  tbody
    tr
      cursor pointer
      td
        padding 2px
        border-bottom 1px solid #F5F5F5
        border-right 1px solid #F5F5F5

        a
          text-decoration none
          color blue
        a:hover
          color blue
    tr:hover
      background-color #F5F5F5


</style>
