module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'project name?',
    default() {
      return 'template';
    },
  },
  {
    type: 'input',
    name: 'version',
    message: 'project version?',
    default() {
      return '0.1.0';
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'project description?',
    default() {
      return 'This is a front-end project built quickly by qqf-cli.';
    },
  },
  {
    type: 'input',
    name: 'author',
    message: 'project author?',
    default() {
      return 'qiqingfu';
    },
  },
  {
    type: 'input',
    name: 'license',
    message: 'license?',
    default() {
      return '';
    },
  },
];
