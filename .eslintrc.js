module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb-base", "plugin:flowtype/recommended"],
  "rules": {
    // Enforcing complexity of the functions by:
    // limiting params, number of statements per function, cyclomatic complexity and callbacks.
    "max-statements": ["error", 7],
    "max-nested-callbacks": ["error", 3],
    "max-params": ["error", 5],
    "complexity": ["error", 10],
    "max-len": ["warn", 120, {
      "ignoreComments": true,
      "ignoreTrailingComments": true,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
    }],
    // Overall code style
    "semi": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "arrow-parens": ["error", "always"],
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
