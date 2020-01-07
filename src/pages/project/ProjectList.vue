<template>
  <div>
    <div class="load-wrapper" v-if="!loading">
      <ui-load :done-time="loading"></ui-load>
    </div>
    <div v-else>
      <div class="tab">
        <ui-btn class="push-right" size="m"
                @emit="created">{{ $t('project.addProject') }}</ui-btn>
      </div>
      <table class="table left">
        <thead>
        <tr>
          <th>Project Name</th>
          <th>Assulgned To</th>
          <th>Property</th>
          <th>Completed</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td :class="completion(project.Completed)">{{ project.projectName }}</td>
          <td :class="completion(project.Completed)">{{ project.Assigned }}</td>
          <td :class="completion(project.Completed)">{{ project.Property }}</td>
          <td>
            <ui-btn
              color="minor"
              size="s"
              v-if="!!project.Completed" @emit="finish(project)">{{ $t('project.cancel') }}</ui-btn>
            <ui-btn
              size="s"
              color="neutral-1"
              @emit="finish(project)"
              v-else>{{ $t('project.finish') }}</ui-btn>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  GET_PROJECTS,
  SET_COMPLETE,
} from '@/utils/constance';

export default {
  name: 'ProjectList',
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
    created() {
      this.$router.push({ name: 'projectAdd' });
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
