<template>
  <div class="test_1">
    <h3> Ship info </h3>

    <table class="info">
      <tbody>
        <tr v-for="(key, index) in Object.keys(shipData)" :key="index">
          <td class="key">{{ key }}</td>
          <td class="val">{{ shipData[key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'info',
  props: {
    msg: String,
  },
  data() {
    return {
      // shipsData: Array,
    };
  },
  computed: {
    ...mapState({
      state: 'test_1',
    }),
    shipData() {
      if ('name' in this.$store.getters.ship) {
        return this.$store.getters.ship;
      }
      return null;
    },
  },
  mounted() {
    const url = this.$route.path;
    const id = url.split('/')[url.split('/').length - 1];
    this.$store.dispatch('infoShip', id);
  },
  methods: {
    routeInfo(url) {
      console.log(url);
    },
  },
};
</script>

<style scoped lang="stylus">
.test_1
  .info
    text-align center
    tr
      td
        padding 5px
        border-bottom 1px solid #F5F5F5
      .key
        text-align right
        border-right 1px solid #F5F5F5

      .val
        text-align left

</style>
