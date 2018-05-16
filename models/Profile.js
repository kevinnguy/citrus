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
    const { firstName, lastName } = this;
    const fullName = `${firstName || ''} ${lastName || ''}`.trim();
    return fullName.length ? fullName : '';
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
      productLikes: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/ProductLikeMetadata',
        join: {
          from: 'profiles.id',
          to: 'product_like_metadata.profileId',
        },
      },
    }
  }
}

module.exports = Profile;