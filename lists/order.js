const { Text, Float, Integer, Relationship } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const emailTemplateSource = fs.readFileSync(
  path.join(__dirname, '../emails/order.hbs'),
  'utf8'
);

const template = handlebars.compile(emailTemplateSource);

const OrderSchema = () => ({
  fields: {
    orderNumber: {
      type: Text,
      isRequired: true
    },
    name: {
      type: Text,
      isRequired: true
    },
    address: {
      type: Text,
      isRequired: true
    },
    area: {
      type: Text,
      isRequired: true
    },
    region: {
      type: Text,
      isRequired: true
    },
    phoneNumber: {
      type: Text,
      isRequired: true
    },
    email: {
      type: Text,
      isRequired: true
    },
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
    },
    lineItems: {
      type: Relationship,
      ref: 'LineItem',
      many: true,
      isRequired: true
    },
    subtotal: {
      type: Float,
      isRequired: true
    },
    discount: {
      type: Float,
      defaultValue: 0
    },
    deliveryFee: {
      type: Float,
      isRequired: true
    },
    total: {
      type: Float,
      isRequired: true
    }
  },
  hooks: {
    afterChange: async ({ originalInput }) => {
      const htmlEmail = template({
        orderNumber: originalInput.orderNumber,
        name: originalInput.name,
        dateOrdered: new Date().toLocaleDateString(),
        address: originalInput.address,
        area: originalInput.area,
        phoneNumber: originalInput.phoneNumber,
        lineItems: originalInput.lineItems.create.map(item => ({
          ...item,
          price: item.price
        })),
        subtotal: originalInput.subtotal.toFixed(2),
        discount: originalInput.discount.toFixed(2),
        deliveryFee: originalInput.deliveryFee.toFixed(2),
        total: originalInput.total.toFixed(2)
      });
      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: process.env.MARKETING_EMAIL,
              Name: process.env.MARKETING_NAME
            },
            To: [
              {
                Email: originalInput.email,
                Name: originalInput.name
              }
            ],
            Subject: 'Thank you for your order',
            HTMLPart: htmlEmail,
            CustomID: 'StrandsEmail'
          }
        ]
      });
      request
        .then(result => {
          console.log(result.body);
        })
        .catch(err => {
          console.log(err.statusCode);
        });
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
