const { Text, Float, Integer } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

const OrderSchema = () => ({
  fields: {
    image: {
      type: Text,
      isRequired: true
    },
    name: {
      type: Text,
      isRequired: true
    },
    category: {
      type: Text,
      isRequired: true
    },
    quantity: {
      type: Integer,
      isRequired: true
    },
    price: {
      type: Float,
      defaultValue: 0,
      isRequired: true
    }
  },
  // List-level access controls
  access: {
    read: true,
    update: false,
    create: true,
    delete: true, //TODO: back to false
    auth: true
  },
  plugins: [atTracking()]
});

module.exports = OrderSchema;
