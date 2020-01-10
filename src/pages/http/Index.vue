<template>
  <div class="container padding">
    <h2 class="mt10 mb20">HTTP请求</h2>
    <ul>
      <li class="pt6 pb6">
        <ui-btn size="xs" @emit="send({type: 'httpbin'})">@httpbin</ui-btn>
      </li>
    </ul>
    <div>
      <p v-if="loading">loading...</p>
      <pre v-else-if="msg">{{ msg }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Http',
  data() {
    return {
      msg: '',
      loading: false,
    };
  },
  methods: {
    async send({ type }) {
      const urls = {
        httpbin: '@httpbin/anything',
      };

      this.loading = true;
      const res = await this.$http.get(urls[type]);
      this.msg = JSON.stringify(res, null, 4);
      this.loading = false;
    },
  },
};
</script>

<style scoped>

</style>
