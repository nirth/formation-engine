module.exports = {
  "rules": {
    "max-statements": ["error", 20],
    "no-unused-vars": ["warn"],
  },
  "env": {
    "node": true,
    "mocha": true,
    "es6": true
  },
  "plugins": [
    "flowtype",
  ],
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true,
    },
  },
};
