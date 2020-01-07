<template>
  <div class="container">
    <div class="form-wrapper">
      <ui-textinput
        :form-name="$t('project.projectName') "
        v-model="formModel.projectName">
      </ui-textinput>
      <ui-textinput
        class="mt20"
        :form-name="$t('project.projectDis') "
        v-model="formModel.Assigned">
      </ui-textinput>
      <ui-textinput
        class="mt20"
        :form-name="$t('project.projectProperty') "
        v-model="formModel.Property">
      </ui-textinput>
      <ui-radio
        :form-name="$t('project.projectProgress') "
        class="border mt20"
        v-model.number="formModel.Completed"
        :list="completedList">
      </ui-radio>
      <ui-btn class="ghost mt20 block" @emit="created">{{ $t('project.createProject') }}</ui-btn>
    </div>
  </div>
</template>

<script>
import { CREATE_PROJECT } from '@/utils/constance';

export default {
  name: 'AddProject',
  data() {
    return {
      formModel: {
        projectName: '',
        Assigned: '',
        Property: '',
        Completed: 0,
      },
      completedList: {
        0: '未完成',
        1: '已完成',
      },
    };
  },
  methods: {
    created() {
      this.$store.dispatch(CREATE_PROJECT, this.formModel)
        .then(() => {
          this.$router.push({ name: 'projectList' });
        });
    },
  },
};
</script>

<style scoped lang="scss">
  .form-wrapper {
    padding: 40px;
    width: 600px;
  }
</style>
