/*
 * @Author: liuzhenli
 * @Date: 2020-05-04 10:43:29
 * @LastEditors: liuzhenli
 * @LastEditTime: 2020-06-16 16:48:49
 */
module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "no-plusplus": "off",
    "semi": "off",
    "max-len": "off",
    "no-param-reassign": "off",
    "no-await-in-loop": "off",
    "no-useless-escape": "off",
    "prefer-const": "off",
    "no-undef": "off",
    "indent": "off",
    "max-classes-per-file": "off",
    "no-unused-vars": [2],
    "no-unused-expressions": [2],
    "template-curly-spacing": [2],
    "no-template-curly-in-string": [0],
    "func-names": [0],
    "arrow-parens": [2, "as-needed"],
    "global-require": [0],
    "implicit-arrow-linebreak": [0],
    "function-paren-newline": [0],
    "object-curly-newline": [0],
    "prefer-destructuring": [1],
    "no-shadow": [1],
    "class-methods-use-this": [1],
    "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [0],
    "react/prop-types": [0],
    "react/jsx-props-no-spreading": [0],
    "react/jsx-boolean-value": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/no-static-element-interactions": [0],
    "jsx-a11y/label-has-associated-control": [0],
    "jsx-a11y/anchor-is-valid": [0],
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  "globals": {
    "document": true,
    "window": true
  },
  "env": {
    "es6": true,
    "node": true,
  },
  "parserOptions": {
    "ecmaFeatures": {
      "legacyDecorators": true
    },
    "parser": 'babel-eslint'
  }
}