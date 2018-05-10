const { Model } = require('objection');

class Category extends Model {
  static get tableName() {
    return 'categories';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['title', 'price', 'retailerUrlPath', 'retailerId'],

      properties: {
        id: { type: 'string', nullable: false, primary: true },
        parentId: { type: 'string' },
        name: { type: 'string', nullable: false, minLength: 1, maxLength: 255 },
        gender: { type: { enum: ['female', 'male', 'all', 'other'] } },
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

module.exports = Category;