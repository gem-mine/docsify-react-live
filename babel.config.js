module.exports = {
  presets: [
    '@gem-mine/app'
  ],
  plugins: [
    ['prismjs', {
      'languages': [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'css',
        'diff',
        'bash',
        'json'
      ]
    }]
  ]
}
