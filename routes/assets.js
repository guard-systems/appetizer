var m = require('mithril')
var header = require('../lib/header')
var request = require('../lib/request')
var assetsModel = require('../models/assets')

var assets = {}

assets.controller = function () {
  return {
    list: assetsModel.list,
    select: function (id) { m.route('/assets/' + id) }
  }
}

assets.view = function (ctrl) {
  return header({
    text: 'Assets',
    content: m('#content', [
      m('.scroller', m('ul', (ctrl.list().length > 0)
      ? assetsList(ctrl)
      : m('.minor-info', ' Nothing to show...'))
    )])
  })
}

function assetsList (ctrl) {
  return ctrl.list().map(function (asset) {
    return m('li.assetlist', { 'data-id': asset.id, onclick: m.withAttr('data-id', ctrl.select) }, asset.name)
  })
}

module.exports = assets
