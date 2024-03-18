import { productIcons } from '@/helpers/scenario';
import { PersonaOptions, ProductOptions, Scenario, TemplateOptions } from '@/interfaces/scenario';
import Tag from './Tag';

export default function TagList({ scenario }: { scenario: Scenario }) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {scenario.products.results.map((product) => (
        <Tag
          key={product.id}
          label={ProductOptions[product.id]}
          iconUrl={productIcons[ProductOptions[product.id]]}
        />
      ))}
      {scenario.templates.results.map((template) => (
        <Tag key={template.id} label={TemplateOptions[template.id]} />
      ))}
      {scenario.personas.results.map((persona) => (
        <Tag key={persona.id} label={PersonaOptions[persona.id]} />
      ))}
    </div>
  );
}
