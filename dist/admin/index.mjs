const PLUGIN_ID = "strapi-email-field";
const index = {
  register(app) {
    app.customFields.register({
      name: "email-field",
      type: "json",
      intlLabel: {
        id: "email-field.label",
        defaultMessage: "Email"
      },
      intlDescription: {
        id: "email-field.description",
        defaultMessage: "Edit content"
      },
      components: {
        Input: async () => import("../_chunks/index-lU18rmHZ.mjs")
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      name: PLUGIN_ID
    });
  }
};
export {
  index as default
};
