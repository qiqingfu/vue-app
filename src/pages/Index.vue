<template>
<div>
  <ui-menu :menu="menuList" :current-menu="currentMenu" @emit="change"></ui-menu>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      menuList: {
        home: {
          name: '首页',
          route: '/',
        },
        project: {
          name: '项目列表',
          route: '/project',
        },
      },
      currentMenu: 'home',
    };
  },
  methods: {
    change(e) {
      this.$router.push({ name: e.key });
    },
    correct() {
      this.currentMenu = this.$route.name;
    },
  },
  mounted() {
    this.correct();
  },
};
</script>

<style scoped>

</style>
