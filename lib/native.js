/* global document, window */
'use strict'

var m = require('mithril')

var init = function () {
  m.redraw()
  window.navigator.splashscreen.hide()
  // document.addEventListener('resume', assets.update, false)
}

module.exports = {
  init: init
}
