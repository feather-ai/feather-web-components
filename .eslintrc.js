module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 7,
  },
  env: {
    es6: true,
    browser: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  rules: {
    "no-undef": "off",
    "no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "unused-imports/no-unused-imports": 1,
    "unused-imports/no-unused-vars": 1,
    "jsx-a11y/anchor-is-valid": 0,
    "react/prop-types": 0,
    "react/no-unescaped-entities": 0,
    "react/jsx-no-target-blank": 0,
    "no-mixed-spaces-and-tabs": 0,
    "no-cond-assign": 0,
    "react/jsx-key": 0,
    "react/display-name": 0,
    "no-lone-blocks": 0,
    "jsx-a11y/accessible-emoji": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
      { usePrettierrc: true },
    ],
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["react", "unused-imports", "prettier", "@typescript-eslint"],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
