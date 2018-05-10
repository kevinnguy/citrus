const { Model } = require('objection');

class Checkout extends Model {
  static get tableName() {
    return 'checkouts';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['title', 'price', 'retailerUrlPath', 'retailerId'],

      properties: {
        id: { type: 'string', nullable: false, primary: true },
        profileId: { type: 'string', nullable: false },
        completedAt: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      checkedOutProducts: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/CheckoutProduct',
        join: {
          from: 'checkouts.id',
          to: 'checkout_products.checkoutId',
        },
      },
    }
  }
}

module.exports = Checkout;