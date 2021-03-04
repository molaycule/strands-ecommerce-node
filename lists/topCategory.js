const { Relationship } = require('@keystonejs/fields');
const { atTracking, singleton } = require('@keystonejs/list-plugins');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');

const TopCategorySchema = (access, fileAdapter) => ({
  fields: {
    category1: {
      type: Relationship,
      isUnique: true,
      isRequired: true,
      ref: 'Category',
      many: false
    },
    category1Image: {
      type: CloudinaryImage,
      adapter: fileAdapter,
      isRequired: true,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.category1Image) {
            await fileAdapter.delete(existingItem.category1Image);
          }
        }
      }
    },
    category2: {
      type: Relationship,
      isUnique: true,
      isRequired: true,
      ref: 'Category',
      many: false
    },
    category2Image: {
      type: CloudinaryImage,
      adapter: fileAdapter,
      isRequired: true,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.category2Image) {
            await fileAdapter.delete(existingItem.category2Image);
          }
        }
      }
    },
    category3: {
      type: Relationship,
      isUnique: true,
      isRequired: true,
      ref: 'Category',
      many: false
    },
    category3Image: {
      type: CloudinaryImage,
      adapter: fileAdapter,
      isRequired: true,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.category3Image) {
            await fileAdapter.delete(existingItem.category3Image);
          }
        }
      }
    }
  },
  hooks: {
    afterDelete: async ({ existingItem }) => {
      if (existingItem) {
        if (existingItem.category1Image) {
          await fileAdapter.delete(existingItem.category1Image);
        }
        if (existingItem.category2Image) {
          await fileAdapter.delete(existingItem.category2Image);
        }
        if (existingItem.category3Image) {
          await fileAdapter.delete(existingItem.category3Image);
        }
      }
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
  plugins: [singleton(), atTracking()],
  adminDoc: 'Top 3 Categories'
});

module.exports = TopCategorySchema;
