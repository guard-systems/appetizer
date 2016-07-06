var request = require('../lib/request')

var _assets = window.asset = []
var _assetsById = {}

function fetch () {
  request({method: "GET", url: "/assets" }).then(function (assets) {
    _assets = assets
    assets.forEach(function (asset) {
      _assetsById[asset.id] = asset
    })
  })
}

function clear () {
  console.log('clear')
  _assets = []
  _assetsById = {}
}

module.exports = {
  fetch: fetch,
  get: function (id) { return _assetsById[id] || false },
  list: function () { return _assets },
  clear: clear
}
