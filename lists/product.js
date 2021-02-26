const { Text, Float, Checkbox, Relationship } = require('@keystonejs/fields');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');

const ProductSchema = (access, fileAdapter) => ({
  fields: {
    name: {
      type: Text,
      isUnique: true,
      isRequired: true
    },
    description: {
      type: Text,
      isRequired: true,
      isMultiline: true
    },
    price: {
      type: Float,
      defaultValue: 0,
      isRequired: true
    },
    isAvailable: {
      type: Checkbox,
      defaultValue: true
    },
    category: {
      type: Relationship,
      ref: 'Category',
      many: false
    },
    mainImage: {
      type: CloudinaryImage,
      adapter: fileAdapter,
      isRequired: true,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.mainImage) {
            await fileAdapter.delete(existingItem.mainImage);
          }
        }
      }
    },
    otherImage: {
      type: CloudinaryImage,
      adapter: fileAdapter,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.otherImage) {
            await fileAdapter.delete(existingItem.otherImage);
          }
        }
      }
    }
  },
  hooks: {
    afterDelete: async ({ existingItem }) => {
      if (existingItem) {
        if (existingItem.mainImage) {
          await fileAdapter.delete(existingItem.mainImage);
        }
        if (existingItem.otherImage) {
          await fileAdapter.delete(existingItem.otherImage);
        }
      }
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

module.exports = ProductSchema;
