const { Text, Float, Checkbox, Relationship } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

const DeliveryFeeSchema = access => ({
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
    isDeliveryAllowed: {
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

module.exports = DeliveryFeeSchema;
