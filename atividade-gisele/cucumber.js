module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'test/support/**/*.ts',
      'test/steps/**/*.ts'
    ],
    format: [
      'progress',
      'allure-cucumberjs/reporter'
    ]
  }
};
