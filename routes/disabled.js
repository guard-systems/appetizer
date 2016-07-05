var m = require('mithril')
var auth = require('../lib/auth')

module.exports = {
  view: function () {
    return m('[style=text-align:center;margin-top:100px]', [
      m('h2', 'Your customer has been disabled'),
      m('h3', 'for more information contact support'),
      m.trust('</br>'),
      m('button', { onclick: function () {
        auth.logout()
        m.route('/login')
      }}, 'To Login')
    ])
  }
}
