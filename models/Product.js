const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['title', 'price', 'retailerUrlPath', 'retailerId'],

      properties: {
        id: { type: 'string', nullable: false, primary: true },
        title: { type: 'string', nullable: false, minLength: 1, maxLength: 500 },
        description: { type: 'string' },
        promo: { type: 'string' },
        price: { type: 'number', nullable: false, minimum: 0 },
        priceOld: { type: 'number', minimum: 0 },
        retailerUrlPath: { type: 'string', nullable: false },
        views: { type: 'number', minimum: 0 },
      },
    };
  };

  static get relationMappings() {
    return {
      retailer: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/Retailer',
        join: {
          from: 'products.retailerId',
          to: 'retailers.id',
        },
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/ProductImage',
        join: {
          from: 'products.id',
          to: 'product_images.productId',
        },
      },
    };
  }
}

module.exports = Product;