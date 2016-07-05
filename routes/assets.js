var m = require('mithril')
var header = require('../lib/header')

var assets = {}

assets.controller = function () {
  return {
    list: function () { return [] },
    select: function (id) { m.route('/assets/' + id) }
  }
}

assets.view = function (ctrl) {
  return header({
    text: 'Assets',
    content: m('#content', [
      m('#scroller', m('ul', (ctrl.list().length > 0)
      ? assetsList(ctrl)
      : m('.minor-info', ' Nothing to show...'))
    )])
  })
}

function assetsList (ctrl) {
  ctrl.list().map(function (asset) {
    return m('li.assetlist', 'I am an asset to GSGroup!')
  })
}

module.exports = assets
