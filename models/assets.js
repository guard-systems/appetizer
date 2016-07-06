var request = require('../lib/request')

var _assets = []
var _assetsById = {}

function fetch () {
  request({method: "GET", url: "/assets" }).then(function (assets) {
    _assets = assets
    assets.forEach(function (asset) {
      _assetsById[asset.id] = asset
    })
  })
}

module.exports = {
  fetch: fetch,
  get: function (id) { return _assetsById[id] },
  list: function () { return _assets }
}
