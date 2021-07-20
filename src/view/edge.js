const edge = require('edge.js').default
const { join } = require('path')

edge.mount(join(__dirname))

module.exports = edge
