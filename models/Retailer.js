const { Model } = require('objection');

class Retailer extends Model {
  static get tableName() {
    return 'retailers';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['title', 'price', 'retailerUrlPath', 'retailerId'],

      properties: {
        id: { type: 'string', nullable: false, primary: true },
        name: { type: 'string', nullable: false, minLength: 1, maxLength: 500 },
        logoURL: { type: 'string' },
        hostname: { type: 'string', nullable: false, minLength: 1, maxLength: 500 },
        path: { type: 'string '},
        scheme: { type: { enum: ['http', 'https'] } },
      },
    };
  }

  static get relationMappings() {
    return {
      // links: {
      //   relation: Model.HasManyRelation,
      //   modelClass: __dirname + '/ProductImage',
      //   join: {
      //     from: 'products.id',
      //     to: 'product_images.productId',
      //   },
      // },
    }
  }
}

module.exports = Retailer;