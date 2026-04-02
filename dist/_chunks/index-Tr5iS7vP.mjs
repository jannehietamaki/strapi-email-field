import { jsx } from "react/jsx-runtime";
import EmailEditor from "react-email-editor";
import { useQueryParams } from "@strapi/strapi/admin";
import styled from "styled-components";
const Wrapper = styled.div`
  iframe {
    min-width: 100% !important;
  }
`;
const EmailEditorComponent = ({ onChange, value, name }) => {
  const [{ query }] = useQueryParams();
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
  return /* @__PURE__ */ jsx(Wrapper, { children: /* @__PURE__ */ jsx(
    EmailEditor,
    {
      onReady,
      options: {},
      minHeight: "800px"
    },
    locale
  ) });
};
export {
  EmailEditorComponent as default
};
