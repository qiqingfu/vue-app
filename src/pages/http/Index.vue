<template>
  <div class="container padding">
    <h2 class="mt10 mb20">请求</h2>
    <ul>
      <li class="pt6 pb6">
        <ui-btn size="xs" @emit="send({type: 'bin'})">@bin</ui-btn>
      </li>
      <li class="pt6 pb6">
        <ui-btn size="xs" @emit="send({type: 'bin-headers'})">@bin-headers</ui-btn>
      </li>
      <li class="pt6 pb6">
        <ui-btn size="xs" @emit="send({type: 'bin-params'})">@bin-params</ui-btn>
      </li>
      <li class="pt6 pb6">
        <ui-btn size="xs" @emit="send({type: 400})">400</ui-btn>
      </li>
      <li class="pt6 pb6">
        <ui-btn size="xs" @emit="send({type: 404})">404</ui-btn>
      </li>
      <li class="pt6 pb6">
        <ui-btn size="xs" @emit="send({type: 502})">502</ui-btn>
      </li>
      <li class="pt6 pb6">
        <ui-btn size="xs" @emit="send({type: 'bin-response'})">@bin-response</ui-btn>
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
  name: '',
  data() {
    return {
      msg: '',
      loading: false,
    };
  },
  methods: {
    async send({ type }) {
      const urls = {
        bin: '@bin/anything',
        'bin-headers': '@bin-headers/anything',
        'bin-params': '@bin-params/anything',
        'bin-response': '@bin-response/anything',
        400: '@bin/status/400',
        404: '@bin/status/404',
        502: '@bin/status/502',
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
