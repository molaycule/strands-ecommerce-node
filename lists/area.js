const { Text, Relationship } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

const AreaSchema = access => ({
  fields: {
    region: {
      type: Relationship,
      ref: 'Region',
      many: false
    },
    area: {
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

module.exports = AreaSchema;
