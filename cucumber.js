module.exports = {
  default: `--require-module ts-node/register \
            --require test/support/**/*.ts \
            --require test/steps/**/*.ts \
            --format @cucumber/pretty-formatter \
            --format allure-cucumberjs/reporter`
};
