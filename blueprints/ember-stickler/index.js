var VersionChecker = require('ember-cli-version-checker');

module.exports = {

  name: 'ember-stickler',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var addon = this;
    var checker = new VersionChecker(addon);
    var addonPackages = [];

    if (checker.for('ember', 'bower').satisfies('>= 2.3')) {
      addonPackages.push({name: 'ember-getowner-polyfill', target: '^1.0.0'});

      return addon.addAddonsToProject({ packages: addonPackages });
    }

  }
};
