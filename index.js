/* global document */

require('array.prototype.find')
var m = require('mithril')

global.apiUrl = 'https://api.guardsystems.com/v1.7'
global.version = 'v0.0.0'

// init native code if run as an hybrid app
var native = require('./lib/native')
document.addEventListener('deviceready', native.init, false)

// remove 300ms delay on click event
var attachFastClick = require('fastclick')
attachFastClick(document.body)

m.route.mode = 'hash'

var auth = require('./lib/auth')
var assets = require('./models/assets')

if (auth.user().id) {
  assets.fetch()
}

m.route(document.getElementById('app'), (auth.user().id ? '/assets' : '/login'), {
  '/login': require('./routes/login'),
  '/assets': require('./routes/assets'),
  '/assets/:assetId': require('./routes/asset'),
  '/disabled': require('./routes/disabled')
})
