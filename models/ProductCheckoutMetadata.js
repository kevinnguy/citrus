const { Model } = require('objection');

class ProductCheckoutMetadata extends Model {
  static get tableName() {
    return 'product_checkout_metadata';
  }

  $formatJson(data) {
    let json = super.$formatJson(data);
    const { productData } = json;
    delete json.productData;

    return {
      ...productData,
      metadata: {
        checkout: json
      },
    };
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
      addedToCart: builder => {
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
          from: 'product_checkout_metadata.productId',
          to: 'products.id',
        },
      },
    }
  }
}

module.exports = ProductCheckoutMetadata;