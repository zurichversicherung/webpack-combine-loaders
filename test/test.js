var combineLoaders = require('../combineLoaders');

var test = require('tap').test;

test('example', (t) => {
  const output = combineLoaders([
    {
      loader: 'css-loader',
      query: {
        modules: true,
        sourceMap: true,
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },
    },
    {
      loader: 'sass-loader',
      query: {
        sourceMap: true,
        includePaths: [
          'app/assets/stylesheets',
          'app/assets/stylesheets/legacy',
        ],
      },
    },
  ]);
  const expected = 'css-loader?modules=true&sourceMap=true&localIdentName=[name]__[local]--[hash:base64:5]!sass-loader?sourceMap=true&includePaths[]=app/assets/stylesheets&includePaths[]=app/assets/stylesheets/legacy';
  t.equals(output, expected);
  t.end();
});

test('example with object', (t) => {
  const output = combineLoaders([
    {
      loader: 'style-loader',
      options: {
        attrs: {
          id: 'test-id'
        }
      }
    },
    {
      loader: 'sass-resources-loader',
      options: {
        // Or array of paths
        resources: [
          'path/to/your/resource'
        ]
      },
    }
  ]);
  const expected = 'style-loader?{"attrs":{"id":"test-id"}}!sass-resources-loader?resources[]=path/to/your/resource';
  t.equals(output, expected);
  t.end();
});
