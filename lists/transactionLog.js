const { Text } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

const TransactionLogSchema = access => ({
  fields: {
    referenceNumber: {
      type: Text
    },
    transactionNumber: {
      type: Text
    },
    message: {
      type: Text
    },
    status: {
      type: Text
    }
  },
  // List-level access controls
  access: {
    read: access.userIsAdmin,
    update: access.userIsAdminOrOwner,
    create: true,
    delete: access.userIsAdmin,
    auth: true
  },
  plugins: [atTracking()]
});

module.exports = TransactionLogSchema;
