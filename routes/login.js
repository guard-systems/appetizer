/* global localStorage */

var m = require('mithril')
var auth = require('../lib/auth')

var login = {}

login.controller = function () {
  console.log(auth.user())
  if (auth.user().id) {
    m.route('/assets')
  }

  var user = JSON.parse(localStorage.getItem('lastLogin')) || { username: '', customer: '' }
  user.password = ''
  var issue = m.prop()

  return {
    user: user,
    issue: issue,
    login: login,
    enter: enter
  }

  function login () {
    localStorage.setItem('lastLogin', JSON.stringify(user))
    auth.login(user)
      .then(function () { m.route('/assets') },
        function (err) {
          if (err) {
            issue('Wrong username or password')
          } else {
            issue('Can\'t connect to GuardSystems, check your internet connection.')
          }
        }
      )
  }

  function enter (e) {
    if (e.keyCode === 13) {
      login()
    }
  }
}

login.view = function (ctrl) {
  return m('#view', [
    m('#content.login', { style: '' }, [
      m('h1[style=text-align:center;]', 'Welcome to Appetizer'),
      createUserInput(ctrl, 'customer', { type: 'number' }),
      createUserInput(ctrl, 'username'),
      createUserInput(ctrl, 'password', { type: 'password', onkeyup: ctrl.enter }),
      m('button', { onclick: ctrl.login, style: 'margin-top: 40px' }, 'Login'),
      ctrl.issue() ? m('div', { style: 'margin-top:20px;color:red;text-align:center;' }, m('i.fa.fa-exclamation-triangle', ' ' + ctrl.issue())) : ''
    ])
  ])
}

function createUserInput (ctrl, prop, options) {
  options = options || {}
  options.placeholder = prop
  options.value = ctrl.user[prop]
  options.oninput = m.withAttr('value', function (value) { ctrl.user[prop] = value })
  return m('input[style=margin-bottom:20px]', options)
}

module.exports = login
