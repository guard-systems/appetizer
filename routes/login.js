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
      m('input[style=margin-bottom:20px]', {
        placeholder: 'Customer ID',
        type: 'number',
        oninput: m.withAttr('value', function (value) { ctrl.user.customer = value }),
        value: ctrl.user.customer
      }),
      m('input[style=margin-bottom:20px]', {
        placeholder: 'Username',
        oninput: m.withAttr('value', function (value) { ctrl.user.username = value }),
        value: ctrl.user.username
      }),
      m('input[style=margin-bottom:20px]', {
        placeholder: 'Password',
        type: 'password',
        onkeyup: ctrl.enter,
        oninput: m.withAttr('value', function (value) { ctrl.user.password = value }),
        value: ctrl.user.password
      }),
      m('button', { onclick: ctrl.login, style: 'margin-top: 40px' }, 'Login'),
      ctrl.issue() ? m('div', { style: 'margin-top:20px;color:red;text-align:center;' }, m('i.fa.fa-exclamation-triangle', ' ' + ctrl.issue())) : ''
    ])
  ])
}

module.exports = login
