module.exports = api => {
  api.cache(true);

  const nodeEnv = process.env.NODE_ENV || 'development';

  const BABEL_PRESET_TARGETS = {
    // wechat dev tools use Chrome 60.0.3112.113
    // see `/Applications/wechatwebdevtools.app/Contents/Versions`
    development: {
      browsers: 'Chrome >= 60',
    },
    // use .browserslistrc in prod mode
    production: undefined,
    test: {
      node: '10',
    },
  };

  const BABEL_MODULES = {
    development: false,
    production: false,
    test: 'commonjs',
  };

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: BABEL_MODULES[nodeEnv],
          targets: BABEL_PRESET_TARGETS[nodeEnv],
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-transform-react-jsx'],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-transform-runtime', { useESModules: true }],
    ],
    // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
    // https://babeljs.io/docs/en/options#sourcetype
    // https://github.com/babel/babel/issues/8900
    sourceType: 'unambiguous',
  };
};
