var m = require('mithril')
var auth = require('./auth')

var header = function (options) {
  options = options || {}
  return m('#view', [
    m('#header', [
      m('[style=float:left]', []),
      options.text ? m('.text', options.text) : '',
      auth.user().id
        ? m('[style=float:right]', [
          'Hello ' + auth.user().username + '',
          m('', { onclick: auth.logout }, 'logout')
        ]) : ''
    ]),
    options.content
  ])
}

module.exports = header
