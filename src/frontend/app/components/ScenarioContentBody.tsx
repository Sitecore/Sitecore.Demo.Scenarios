import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { ImagesField, Scenario, TextField } from '@/interfaces/scenario';
import { useMemo } from 'react';
import { generateImagesHtml, generateTextHtml } from '@/helpers/richText';
import CodeBlock from './CodeBlock';

interface NodeWithChildrenAndData extends Element {
  data: string;
  children: NodeWithChildrenAndData[];
}

export default function ScenarioContentBody({ scenario }: { scenario: Scenario }) {
  const options: HTMLReactParserOptions = useMemo(() => {
    return {
      replace(domNode) {
        if (domNode instanceof Element && domNode.attribs) {
          if (domNode.tagName === 'pre') {
            const preNode = domNode as NodeWithChildrenAndData;
            const codeNode = preNode.childNodes[0] as NodeWithChildrenAndData;

            return <CodeBlock code={codeNode.children[0].data} language={codeNode.attribs.class} />;
          }
        }
      },
    };
  }, []);

  const fieldsHtml = useMemo(() => {
    const arr = Array.from({ length: 10 });
    const fieldsHtml = arr.map((_, i) => {
      const textField = scenario[`text${i + 1}` as keyof Scenario] as TextField;
      const imageField = scenario[`images${i + 1}` as keyof Scenario] as ImagesField;
      return `${generateTextHtml(textField)}${generateImagesHtml(imageField)}`;
    });

    return fieldsHtml.join('');
  }, [scenario]);

  const sectionsHtml = useMemo(() => {
    const sections = scenario.scenarioSection?.results;
    return sections && sections.length > 0
      ? sections
          .map(
            (section) => `${generateTextHtml(section.text)}${generateImagesHtml(section.images)}`
          )
          .join('')
      : '';
  }, [scenario]);

  return (
    <div className="rich-text">
      <hr />
      {parse(`${fieldsHtml}${sectionsHtml}`, options)}
    </div>
  );
}
