
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-hot-toast.cjs.production.min.js')
} else {
  module.exports = require('./react-hot-toast.cjs.development.js')
}
