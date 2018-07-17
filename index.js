const requireDir = require('require-dir');
module.exports = requireDir('./models');

// module.exports = require('./models');

module.exports.objection = require('objection');