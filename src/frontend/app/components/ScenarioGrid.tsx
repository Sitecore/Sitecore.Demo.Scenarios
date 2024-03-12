import { productIcons } from '@/helpers/scenario';
import {
  CategoryOptions,
  PersonaOptions,
  ProductOptions,
  Scenario,
  TemplateOptions,
} from '@/interfaces/scenario';
import Tag from './Tag';
import BookmarkIcon from './BookmarkIcon';
import Link from 'next/link';

type ScenarioGridProps = {
  scenarios: Scenario[];
  onBookmarkIconClick?: () => void;
};

export default function ScenarioGrid({ scenarios, onBookmarkIconClick }: ScenarioGridProps) {
  return (
    <div className="flex flex-wrap gap-6 py-4 grid-container">
      {scenarios.map((scenario, index) => (
        <Link
          key={index}
          className="group relative bg-white rounded-lg shadow-card py-10 px-8 basis-[calc(33.33%-1rem)] flex-grow min-w-96 transition-all cursor-pointer hover:shadow-card-hover"
          href={`/scenarios/${scenario.id}`}
          scroll={false}
        >
          <BookmarkIcon scenarioID={scenario.id} onClick={onBookmarkIconClick} />
          <h3 className="uppercase text-sm mb-1 tracking-wider font-medium">
            {CategoryOptions[scenario.category.results[0].id]}
          </h3>
          <h2 className="capitalize text-2xl font-bold mb-2">
            <span className="text-highlight group-hover:text-highlight-hover">
              {scenario.title}
            </span>
          </h2>
          <p className="line-clamp-3 mb-3">{scenario.summary}</p>
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
        </Link>
      ))}
      <div className="basis-[calc(33.33%-1rem)] flex-grow min-w-96"></div>
      <div className="basis-[calc(33.33%-1rem)] flex-grow min-w-96"></div>
    </div>
  );
}
