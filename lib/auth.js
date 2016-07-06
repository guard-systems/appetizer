/* global localStorage */

var m = require('mithril')
var apiUrl = global.apiUrl

// define an empty authenticated user
var authUser = {}

// check if user authenitcation is stored in local storage
if (localStorage.getItem('auth-user')) {
  authUser = JSON.parse(localStorage.getItem('auth-user'))
}

module.exports = {
  user: function () { return authUser },
  login: login,
  logout: logout
}

function login (options) {
  var url = apiUrl + '/login'
  return m.request({method: 'GET', data: options, url: url}).then(function (user) {
    localStorage.setItem('auth-user', JSON.stringify(user))
    require('../models/assets').fetch()
    authUser = user
  })
}

function logout () {
  localStorage.setItem('auth-user', '')
  authUser = {}
  require('../models/assets').clear()
  m.route('/login')
}
