module.exports = {
    plugins: [
        require('autoprefixer')(),
        require('postcss-url')({
            url: (asset) => {
              const absPath = asset.absolutePath
              const relPath = require('path').relative('dist', absPath)
              return relPath + asset.search + asset.hash
            },
        }),
        require('cssnano')({ safe: true }),
    ]
}
