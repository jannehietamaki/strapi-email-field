import { useRef, useEffect } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import styled from "styled-components";

const Wrapper = styled.div`
  iframe {
    min-width: 100% !important;
  }
`;

const getDesign = (val: any) => {
  if (!val) return null;
  const d = typeof val === "string" ? JSON.parse(val) : val;
  return d?.design || null;
};

const EmailEditorComponent = ({ onChange, value, name }: any) => {
  const emailEditorRef = useRef<EditorRef>(null);
  const unlayerRef = useRef<any>(null);

  // Handle value changes (e.g., locale switch)
  useEffect(() => {
    const design = getDesign(value);
    if (unlayerRef.current && design) {
      unlayerRef.current.loadDesign(design);
    }
  }, [value]);

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    unlayerRef.current = unlayer;

    unlayer.addEventListener("design:updated", () => {
      unlayer?.exportHtml((data: { design: object; html: string }) => {
        const { design, html } = data;
        onChange({
          target: {
            name,
            value: JSON.stringify({ design, html }),
          },
        });
      });
    });

    // Initial load
    const design = getDesign(value);
    if (design) {
      unlayer.loadDesign(design);
    }
  };

  return (
    <Wrapper>
      <EmailEditor
        ref={emailEditorRef}
        onReady={onReady}
        options={{}}
        minHeight={"800px"}
      />
    </Wrapper>
  );
};

export default EmailEditorComponent;
