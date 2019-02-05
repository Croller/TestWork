<template>
  <div class="home">
    <StartPage msg="Welcome to My Test Repo at Vue.js"/>
  </div>
</template>

<script>
// @ is an alias to /src
import StartPage from '@/components/StartPage.vue';

export default {
  name: 'home',
  components: {
    StartPage,
  },
};
</script>
