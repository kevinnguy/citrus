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
      productsMetadata: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/ProductCheckoutMetadata',
        join: {
          from: 'checkouts.id',
          to: 'product_checkout_metadata.checkoutId',
        },
      },
    }
  }
}

module.exports = Checkout;