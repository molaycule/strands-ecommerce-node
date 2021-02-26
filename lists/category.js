const { Text } = require('@keystonejs/fields');

const CategorySchema = access => ({
  fields: {
    name: {
      type: Text,
      isUnique: true,
      isRequired: true
    }
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true
  }
});

module.exports = CategorySchema;
