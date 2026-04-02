"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const EmailEditor = require("react-email-editor");
const admin = require("@strapi/strapi/admin");
const styled = require("styled-components");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const EmailEditor__default = /* @__PURE__ */ _interopDefault(EmailEditor);
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const Wrapper = styled__default.default.div`
  iframe {
    min-width: 100% !important;
  }
`;
const EmailEditorComponent = ({ onChange, value, name }) => {
  const [{ query }] = admin.useQueryParams();
  const locale = query?.plugins?.i18n?.locale;
  const onReady = (unlayer) => {
    unlayer.addEventListener("design:updated", () => {
      unlayer.exportHtml((data) => {
        const { design: design2, html } = data;
        onChange({
          target: {
            name,
            value: JSON.stringify({ design: design2, html })
          }
        });
      });
    });
    const design = value?.design || null;
    if (design) {
      unlayer.loadDesign(design);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(Wrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(
    EmailEditor__default.default,
    {
      onReady,
      options: {},
      minHeight: "800px"
    },
    locale
  ) });
};
exports.default = EmailEditorComponent;
