define([
      'lib/underscore'
    , 'component/i18n/index'
    , 'component/config/index'
  ],
function (_, Model, i18n_config) {
  function load(name, req, onload, config) {
    if (config.isBuild) {
      onload();
    } else {
      // todo [akamel] test i18n_config and assign default
      var culture = i18n_config.get('culture').toLowerCase();

      switch (culture) {
        case 'id-id':
        case 'nb-no':
        case 'nl-nl':
        case 'da-dk':
        case 'fi-fi':
        case 'sv-se':
        case 'th-th':
        case 'vi-vn':
          culture = 'en-us';
          break;
        case 'zh-hk':
        case 'zh-tw':
          culture = 'zh-hant';
          break;
      }

      req(['data/i18n/' + name + '/' + culture], function (data) {
        onload(new Model({ data: data, culture: culture }));
      });
    }
  };

  return {
    load: load
  };
});
