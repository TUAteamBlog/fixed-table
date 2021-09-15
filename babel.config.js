module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          { targets: { node: 'current' } },
        ],
      ],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
      ],
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          { modules: false },
        ],
      ],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-object-rest-spread',
      ],
    },
  },
};
