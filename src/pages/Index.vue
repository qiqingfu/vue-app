<template>
  <div>
    <div class="container menu">
      <ui-menu :menu="menuList" @emit="change"></ui-menu>
      <div class="lang">
      <span :class="[
          'ml4',
          {'active': lang === language.key}
        ]"
            @click="changeLang(language)"
        v-for="language in languages" :key="language.key">
        {{ language.label }}
      </span>
      </div>
    </div>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getCookieLanguage } from '@/locales/';

export default {
  name: 'Index',
  data() {
    return {
      menuList: {
        '/': '首页',
        project: {
          name: '项目',
          children: {
            '/project/list': '项目列表',
            '/project/add': '新增项目',
          },
          groups: {
            项目管理: ['/project/list', '/project/add'],
          },
        },
        '/http': 'http请求',
      },
      lang: '',
      languages: [
        { label: 'EngLish', key: 'en-us' },
        { label: '中文', key: 'zh-cn' },
      ],
    };
  },
  methods: {
    change(e) {
      if (e.key === this.$route.name) {
        return;
      }
      this.$router.push({ path: e.key });
    },
    changeLang(langInfo) {
      this.$i18n.setLocale({
        locale: langInfo.key,
        redirect: false,
      });
      this.lang = langInfo.key;
    },
  },
  mounted() {
    this.lang = getCookieLanguage();
  },
};
</script>

<style scoped lang="scss">
  .lang {
    position: absolute;
    right: 20px;
    top: 0;
    line-height: 66px;
    font-size: 12px;
    cursor: pointer;

    & > span {
      position: relative;
    }

    & > span:not(:last-child) {
      &::after {
        content: "";
        display: inline-block;
        width: 1px;
        margin-left: 2px;
        height: 10px;
        background-color: #2B3245;
      }
    }

    & > .active {
      color: #F33D5D;
    }
  }
</style>
