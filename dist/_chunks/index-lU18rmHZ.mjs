import { jsx } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import EmailEditor from "react-email-editor";
import styled from "styled-components";
const Wrapper = styled.div`
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
  const emailEditorRef = useRef(null);
  const unlayerRef = useRef(null);
  const lastInternalDesign = useRef(null);
  useEffect(() => {
    const design = getDesign(value);
    if (!design) return;
    if (lastInternalDesign.current === JSON.stringify(design)) return;
    if (unlayerRef.current) {
      unlayerRef.current.loadDesign(design);
    }
  }, [value]);
  const onReady = (unlayer) => {
    unlayerRef.current = unlayer;
    unlayer.addEventListener("design:updated", () => {
      unlayer?.exportHtml((data) => {
        const { design: design2, html } = data;
        lastInternalDesign.current = JSON.stringify(design2);
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
  return /* @__PURE__ */ jsx(Wrapper, { children: /* @__PURE__ */ jsx(
    EmailEditor,
    {
      ref: emailEditorRef,
      onReady,
      options: {},
      minHeight: "800px"
    }
  ) });
};
export {
  EmailEditorComponent as default
};
