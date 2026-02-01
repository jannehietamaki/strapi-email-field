"use strict";
const register = ({ strapi }) => {
  strapi.customFields.register({
    name: "email-field",
    type: "json",
    inputSize: {
      default: 12,
      isResizable: false
    }
  });
};
const index = {
  register
};
module.exports = index;
