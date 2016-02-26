define(['lib/underscore', 'component/config/index'], function (_, config) {
  function model(settings) {
    if (!_.isObject(settings) || !_.isObject(settings.data)) {
      throw new Error('Localization data must be an Object');
    }

    this.data = settings.data;
    this.culture = settings.culture;
  }

  model.prototype.get = function (key, model, options) {
    if (!_.isString(key)) {
      throw new Error('Localization key must be a String');
    }

    var ret = _.has(this.data, key) ? this.data[key] : undefined;

    if (ret) {
      if (model) {
        var compiled = _.template(ret);
        ret = compiled(model);
      }
    } else {
      if (config.get('debug')) {
        console.error(key);
        ret = '[' + key.toUpperCase() + ']';
      }
    }
    
    return ret;
  };

  return model;
});