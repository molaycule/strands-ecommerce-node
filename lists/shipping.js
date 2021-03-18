const { Text, Float, Checkbox, Relationship } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

const ShippingSchema = access => ({
  fields: {
    country: {
      type: Relationship,
      ref: 'Country',
      many: false
    },
    state: {
      type: Text,
      isUnique: true,
      isRequired: true
    },
    fee: {
      type: Float,
      defaultValue: 0,
      isRequired: true
    },
    isShippingAllowed: {
      type: Checkbox,
      defaultValue: true
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

module.exports = ShippingSchema;
