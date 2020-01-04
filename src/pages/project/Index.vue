<template>
  <div>
    <div class="load-wrapper" v-if="!loading">
      <ui-load :done-time="loading"></ui-load>
    </div>
    <table class="table left" v-else>
      <thead>
      <tr>
        <th>Project Name</th>
        <th>Assulgned To</th>
        <th>Priority</th>
        <th>Completed</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="project in projects" :key="project.id">
        <td>{{ project.projectName }}</td>
        <td>{{ project.Assigned }}</td>
        <td>{{ project.Proority }}</td>
        <td>{{ project.Completed }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { GET_PROJECTS } from '@/utils/constance';

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
  },
  computed: {
    ...mapState({
      projects: state => state.project.projects,
    }),
  },
  mounted() {
    this.getProjects();
  },
};
</script>

<style scoped lang="scss">
  .load-wrapper {
    height: 80vh;
  }
</style>
