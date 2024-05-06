import React, { useEffect, useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import styled from "styled-components";

const Wrapper = styled.div`
  iframe {
      min-width: 100% !important;
  }
`;

const EmailEditorComponent = ({ onChange, value, name }: any) => {
  const emailEditorRef = useRef<EditorRef>(null);

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    unlayer.addEventListener('design:updated', () => {
      unlayer?.exportHtml((data) => {
        const { design, html } = data;
        onChange({
          target: {
            name,
            value: JSON.stringify({ design, html }),
          },
        });
      });
    });

    if (value) {
      const d = JSON.parse(value);
      if (d?.design) {
        unlayer.loadDesign(d?.design);
      }
    }
  };

  return (
    <Wrapper>
      <EmailEditor ref={emailEditorRef} onReady={onReady} options={{}} minHeight={"800px"}/>
    </Wrapper>
  );
};

export default EmailEditorComponent;