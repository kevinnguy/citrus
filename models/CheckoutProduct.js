const { Model } = require('objection');

class CheckoutProduct extends Model {
  static get tableName() {
    return 'checkout_products';
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
}

module.exports = CheckoutProduct;