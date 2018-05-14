const { Model } = require('objection');

class ProductLikeMetadata extends Model {
  static get tableName() {
    return 'product_like_metadata';
  }

  $formatJson(data) {
    let json = super.$formatJson(data);
    const { productData } = json;

    if (productData) {
      delete json.productData;
      return {
        ...productData,
        metadata: {
          like: json
        },
      };
    }

    return json;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['title', 'price', 'retailerUrlPath', 'retailerId'],

      properties: {
        id: { type: 'string', nullable: false, primary: true },
        productId: { type: 'string', nullable: false },
        profileId: { type: 'string', nullable: false },
        deleted: { type: 'bool', nullable: false },
      },
    };
  }

  static get namedFilters() {
    return {
      liked: builder => builder.where('deleted', false),
    };
  }

  static get relationMappings() {
    return {
      productData: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/Product',
        join: {
          from: 'product_like_metadata.productId',
          to: 'products.id',
        },
      },
    }
  }
}

module.exports = ProductLikeMetadata;