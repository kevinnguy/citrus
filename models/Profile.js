const { Model } = require('objection');

class Profile extends Model {
  static get tableName() {
    return 'profiles';
  }

  $formatJson(data) {
    let json = super.$formatJson(data);

    delete json.password;

    return json;
  }

  static get virtualAttributes() {
    return ['fullName'];
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['title', 'price', 'retailerUrlPath', 'retailerId'],

      properties: {
        id: { type: 'string', nullable: false, primary: true },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        username: { type: 'string' },
        phone: { type: 'string' },
        karma: { type: 'number', nullable: false, minimum: 0 },
        imageUrl: { type: 'string' },
      },
    };
  };

  static get relationMappings() {
    return {
      // retailer: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: __dirname + '/Retailer',
      //   join: {
      //     from: 'products.retailerId',
      //     to: 'retailers.id',
      //   },
      // },
      // images: {
      //   relation: Model.HasManyRelation,
      //   modelClass: __dirname + '/ProductImage',
      //   join: {
      //     from: 'products.id',
      //     to: 'product_images.productId',
      //   },
      // },
    };
  }
}

module.exports = Profile;