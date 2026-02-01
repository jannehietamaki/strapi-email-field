import type { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: "email-field",
    type: "json",
    inputSize: {
      default: 12,
      isResizable: false,
    },
  });
};
