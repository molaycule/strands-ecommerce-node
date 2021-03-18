const { Text } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

const CountrySchema = access => ({
  fields: {
    name: {
      type: Text,
      isUnique: true,
      isRequired: true
    }
  },
  // List-level access controls
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true
  },
  plugins: [atTracking()]
});

module.exports = CountrySchema;
