<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  GET_PROJECTS,
  SET_COMPLETE,
} from '@/utils/constance';

export default {
  name: 'IndexVuex',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getProjects() {
      this.$store.dispatch(GET_PROJECTS)
        .then(() => {
          this.loading = true;
        })
        .catch(() => {
          this.loading = true;
        });
    },
    completion(state) {
      return {
        through: !!state,
      };
    },
    finish(item) {
      this.$store.dispatch(SET_COMPLETE, { id: item.id });
    },
  },
  computed: {
    ...mapState({
      projects: state => state.project.projects,
    }),
  },
  mounted() {
    this.getProjects();
    console.log(this);
  },
};
</script>

<style scoped lang="scss">
  .load-wrapper {
    height: 80vh;
  }
</style>
