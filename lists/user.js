const { Text, Checkbox, Password } = require('@keystonejs/fields');

const UserSchema = access => ({
  fields: {
    name: {
      type: Text,
      isRequired: true
    },
    email: {
      type: Text,
      isUnique: true,
      isRequired: true
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin
      }
    },
    password: {
      type: Password,
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

module.exports = UserSchema;
