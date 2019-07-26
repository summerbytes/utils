const path = require('path')
const glob = require('glob')

// console.log('yo', glob.sync('src#<{(|.js'))

const entryArray = glob.sync('src/*.js')
const entryObject = entryArray.reduce((acc, item) => {
  // let name = item.replace('.js', '')
  let name = item.replace('src/', '')
  acc[name.replace('.js', '')] = './' + item
  console.log(acc)
  return acc
}, {})
module.exports = {
  // entry: './src/index.js',
  entry: entryObject,
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
  },
}
