module.exports = {
  // start from the GitHub default
  ...require("@github/prettier-config"),
  plugins: ["prettier-plugin-organize-imports"],
  semi: true,
  trailingComma: "es5",
  tabWidth: 2,
  singleQuote: false,
};
