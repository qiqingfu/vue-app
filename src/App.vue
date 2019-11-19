<template>
  <div id="app">
    <Title />
  </div>
</template>

<script>
import Title from './components/Title.vue';

export default {
  name: 'app',
  components: {
    Title,
  },
};
</script>

<style lang="scss">
#abc {
  color: red;
  font-size: 20px;
}
</style>
