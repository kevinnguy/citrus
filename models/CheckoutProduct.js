const { Model } = require('objection');

class CheckoutProduct extends Model {
  static get tableName() {
    return 'checkout_products';
  }

  $formatJson(data) {
    let json = super.$formatJson(data);
    const { quantity, productData } = json;

    return {
      ...productData,
      quantity,
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['title', 'price', 'retailerUrlPath', 'retailerId'],

      properties: {
        id: { type: 'string', nullable: false, primary: true },
        checkoutId: { type: 'string', nullable: false },
        productId: { type: 'string', nullable: false },
        quantity: { type: 'number', minimum: 0 },
      },
    };
  }

  static get namedFilters() {
    return {
      exists: builder => {
        builder.where('quantity', '>', 0);
      }
    };
  }

  static get relationMappings() {
    return {
      productData: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/Product',
        join: {
          from: 'checkout_products.productId',
          to: 'products.id',
        },
      },
    }
  }
}

module.exports = CheckoutProduct;