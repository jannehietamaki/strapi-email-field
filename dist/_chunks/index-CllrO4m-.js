"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const EmailEditor = require("react-email-editor");
const styled = require("styled-components");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const EmailEditor__default = /* @__PURE__ */ _interopDefault(EmailEditor);
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const Wrapper = styled__default.default.div`
  iframe {
    min-width: 100% !important;
  }
`;
const getDesign = (val) => {
  if (!val) return null;
  const d = typeof val === "string" ? JSON.parse(val) : val;
  return d?.design || null;
};
const EmailEditorComponent = ({ onChange, value, name }) => {
  const emailEditorRef = react.useRef(null);
  const unlayerRef = react.useRef(null);
  react.useEffect(() => {
    const design = getDesign(value);
    if (unlayerRef.current && design) {
      unlayerRef.current.loadDesign(design);
    }
  }, [value]);
  const onReady = (unlayer) => {
    unlayerRef.current = unlayer;
    unlayer.addEventListener("design:updated", () => {
      unlayer?.exportHtml((data) => {
        const { design: design2, html } = data;
        onChange({
          target: {
            name,
            value: JSON.stringify({ design: design2, html })
          }
        });
      });
    });
    const design = getDesign(value);
    if (design) {
      unlayer.loadDesign(design);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(Wrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(
    EmailEditor__default.default,
    {
      ref: emailEditorRef,
      onReady,
      options: {},
      minHeight: "800px"
    }
  ) });
};
exports.default = EmailEditorComponent;
