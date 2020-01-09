<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { transformLang } from '@/utils/tools';

export default {
  name: 'app',
  metaInfo() {
    const info = {
      htmlAttrs: {
        lang: transformLang(this.$i18n.locale),
      },
      meta: [],
    };

    if (this.$route.meta.title) {
      info.title = this.$t(this.$preMeta(this.$route.meta.title));
    }
    if (this.$route.meta.keywords) {
      info.meta.push({
        vmid: 'keywords',
        name: 'keywords',
        content: this.$t(this.$preMeta(this.$route.meta.keywords)),
      });
    }
    if (this.$route.meta.description) {
      info.meta.push({
        vmid: 'description',
        name: 'description',
        content: this.$t(this.$preMeta(this.$route.meta.description)),
      });
    }
    return info;
  },
};
</script>

<style lang="scss">
</style>
