module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['.'],
        alias: {
          '@gregcello/revealjs-react': './packages/revealjs-react',
        },
      },
    ],
  ],
};
