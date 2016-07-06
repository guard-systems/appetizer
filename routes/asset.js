var m = require('mithril')
var header = require('../lib/header')
var request = require('../lib/request')
var assets = require('../models/assets')

var asset = {}

asset.controller = function () {
  var asset = assets.get(m.route.param('assetId'))
  return {
    asset: asset,
    back: function (id) { m.route('/assets') }
  }
}

asset.view = function (ctrl) {
  var asset = ctrl.asset
  console.log(asset)
  return header({
    back: ctrl.back,
    text: 'Asset',
    content: m('#content', [
      m('', 'Tracker id: ' + asset.tracker_id),
      m('', 'Registation id: ' + asset.registration_id),
      m('', 'Name: ' + asset.name)
    ])
  })
}

module.exports = asset
