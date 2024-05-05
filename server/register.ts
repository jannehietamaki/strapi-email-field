import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'email-field',
    type: 'json',
    inputSize: {
      default: 12,
      isResizable: false,
    }
  });
};
