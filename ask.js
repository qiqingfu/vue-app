module.exports = [
  {
    type: "input",
    name: "name",
    message: "project name?",
    default: function() {
      return "template";
    }
  },
  {
    type: "input",
    name: "version",
    message: "project version?",
    default: function() {
      return "0.1.0";
    }
  },
  {
    type: "input",
    name: "description",
    message: "project description?",
    default: function() {
      return "This is a front-end project built quickly by qqf-cli.";
    }
  },
  {
    type: "input",
    name: "author",
    message: "project author?",
    default: function() {
      return "qiqingfu";
    }
  },
  {
    type: "input",
    name: "license",
    message: "license?",
    default: function() {
      return "";
    }
  }
];
