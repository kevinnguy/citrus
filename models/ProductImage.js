const { Model } = require('objection');
const URI = require('urijs');

class ProductImage extends Model {
  static get tableName() {
    return 'product_images';
  }

  static get virtualAttributes() {
    return ['url'];
  }

  url() {
    const { hostname, path, scheme: protocol } = this;
    return URI({
      hostname,
      path,
      protocol,
    }).toString();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['title', 'price', 'retailerUrlPath', 'retailerId'],

      properties: {
        id: { type: 'string', nullable: false, primary: true },
        hostname: { type: 'string', nullable: false, minLength: 1, maxLength: 500 },
        path: { type: 'string '},
        scheme: { type: { enum: ['http', 'https'] } },
        productId: { type: 'string', nullable: false },
        retailerId: { type: 'string', nullable: false },
      },
    };
  }

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/Product',
        join: {
          from: 'product_images.productId',
          to: 'products.id',
        },
      },
    };
  }
}

module.exports = ProductImage;