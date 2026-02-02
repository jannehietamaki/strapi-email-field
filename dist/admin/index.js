"use strict";
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
        Input: async () => Promise.resolve().then(() => require("../_chunks/index-CllrO4m-.js")).then((m) => m.default)
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      name: PLUGIN_ID
    });
  }
};
module.exports = index;
