var qs = require('qs');

function combineLoaders(loaders) {
  return loaders.map(function(loaderEntry) {
    if (typeof loaderEntry === 'string') {
      return loaderEntry;
    }

    var query = qs.stringify(loaderEntry.query, {
      arrayFormat: 'brackets',
      encode: false,
    });

    if (loaderEntry.options) {
      query = Object.keys(loaderEntry.options)
        .map((optionKey) => {
          const optionValue = loaderEntry.options[optionKey];
          const newQueryObject = {};
          newQueryObject[optionKey] = optionValue;

          // if option key has an array as value, use JSON stringify instead of qs.stringify
          if (typeof optionValue === 'object' && !Array.isArray(optionValue)) {
            return JSON.stringify(newQueryObject);
          } else {
            return qs.stringify(newQueryObject, {
              arrayFormat: 'brackets',
              encode: false,
            });
          }
        })
        .join('&');
    }

    if (query) {
      query = '?' + query;
    }

    return loaderEntry.loader + query;
  }).join('!');
}

module.exports = combineLoaders;
