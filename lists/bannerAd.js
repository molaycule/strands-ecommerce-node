const { Text } = require('@keystonejs/fields');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');
const { atTracking } = require('@keystonejs/list-plugins');

const BannerAdSchema = (access, fileAdapter) => ({
  fields: {
    title: {
      type: Text,
      isRequired: true
    },
    subtitle: {
      type: Text
    },
    image: {
      type: CloudinaryImage,
      adapter: fileAdapter,
      isRequired: true,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.image) {
            await fileAdapter.delete(existingItem.image);
          }
        }
      }
    }
  },
  hooks: {
    afterDelete: async ({ existingItem }) => {
      if (existingItem) {
        if (existingItem.image) {
          await fileAdapter.delete(existingItem.image);
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
  plugins: [atTracking()]
});

module.exports = BannerAdSchema;
