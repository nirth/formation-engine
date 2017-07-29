module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb-base", "plugin:flowtype/recommended"],
  "rules": {
    "arrow-parens": ["error", "always"],
    "object-curly-spacing": ["error", "never"],
    "semi": ["error", "never"],
    "max-len": ["warn", 120],
    "no-trailing-spaces": ["error", {"skipBlankLines": true}],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never",
    }],
  },
  "env": {
    "browser": true,
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
