import EmailEditor, { EmailEditorProps } from "react-email-editor";
import { useQueryParams } from "@strapi/strapi/admin";
import styled from "styled-components";

const Wrapper = styled.div`
  iframe {
    min-width: 100% !important;
  }
`;

const EmailEditorComponent = ({ onChange, value, name }: any) => {
  const [{ query }] = useQueryParams<{
    plugins: { i18n: { locale: string } };
  }>();

  const locale = query?.plugins?.i18n?.locale;

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    unlayer.addEventListener("design:updated", () => {
      unlayer.exportHtml((data: { design: object; html: string }) => {
        const { design, html } = data;
        onChange({
          target: {
            name,
            value: JSON.stringify({ design, html }),
          },
        });
      });
    });

    const design = value?.design || null;
    if (design) {
      unlayer.loadDesign(design);
    }
  };

  return (
    <Wrapper>
      <EmailEditor
        key={locale}
        onReady={onReady}
        options={{}}
        minHeight={"800px"}
      />
    </Wrapper>
  );
};

export default EmailEditorComponent;
