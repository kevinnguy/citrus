module.exports = {
  Category: require('./models/Category'),
  Product: require('./models/Product'),
  ProductImage: require('./models/ProductImage'),
  Profile: require('./models/Profile'),
  Retailer: require('./models/Retailer'),
  RetailerCategoryLink: require('./models/RetailerCategoryLink'),
}

module.exports.objection = require('objection');