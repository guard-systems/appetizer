var m = require('mithril')
var auth = require('./auth')

var xhrConfig = function (xhr) {
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('api_key', auth.user().api_key)
}

var request = function (options) {
  options.config = xhrConfig
  options.url = global.apiUrl + options.url
  options.unwrapError = function (response) {
    if (response.message === 'Error: Customer is disabled') {
      m.route('/disabled')
    }
    return response.error
  }

  return m.request(options)
}

module.exports = request
