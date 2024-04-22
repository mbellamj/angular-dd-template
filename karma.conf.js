// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    junitReporter: {
      useBrowserName: true,
      outputDir: require('path').join(__dirname, './coverage/angular-ddd-template/xml'),
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-ddd-template/code'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'cobertura' }],
      check: {
        global: {
          statements: 75,
          branches: 60,
          functions: 60,
          lines: 75,
        },
      },
    },
    reporters: ['progress', 'kjhtml', 'coverage', 'junit'],
    browsers: ['Chrome'],
    restartOnFileChange: true,
  });
};
