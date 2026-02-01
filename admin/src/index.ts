import { PLUGIN_ID } from "./pluginId";

export default {
  register(app: any) {
    app.customFields.register({
      name: "email-field",
      type: "json",
      intlLabel: {
        id: "email-field.label",
        defaultMessage: "Email",
      },
      intlDescription: {
        id: "email-field.description",
        defaultMessage: "Edit content",
      },
      components: {
        Input: async () => import("./components/Input"),
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      name: PLUGIN_ID,
    });
  },
};
