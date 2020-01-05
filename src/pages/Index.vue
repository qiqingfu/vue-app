<template>
<div>
  <div class="container menu">
    <ui-menu :menu="menuList" :current-menu="currentMenu" @emit="change"></ui-menu>
  </div>
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
          name: '项目',
          children: {
            projectList: '项目列表',
            projectAdd: '新增项目',
          },
          groups: {
            项目管理: ['projectList', 'projectAdd'],
          },
          route: '/project',
        },
      },
      currentMenu: 'home',
    };
  },
  methods: {
    change(e) {
      if (e.key === this.$route.name) {
        return;
      }
      this.$router.push({ name: e.key });
    },
  },

  watch: {
    $route: {
      handler() {
        this.currentMenu = this.$route.path.replace(/([^\\+])/, '') || this.$route.name;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
