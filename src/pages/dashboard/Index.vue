<template>
  <div class="container margin">
    <h2>Dashboard</h2>
    <div v-if="info" class="mt16">
      <h4>用户信息</h4>
      <ul class="mt10">
        <li>{{ info.name }}</li>
        <li>{{ info.github }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      info: null,
    };
  },
  computed: {
    userinfo() {
      return this.$store.state.user.info;
    },
  },
  methods: {
    init(data) {
      this.info = data;
    },
  },
  watch: {
    userinfo: {
      handler(data) {
        this.init(data);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
