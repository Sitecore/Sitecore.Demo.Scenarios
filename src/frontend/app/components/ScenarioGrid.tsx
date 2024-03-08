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

type ScenarioGridProps = {
  scenarios: Scenario[];
  onBookmarkIconClick?: () => void;
};

export default function ScenarioGrid({ scenarios, onBookmarkIconClick }: ScenarioGridProps) {
  return (
    <>
      {scenarios.map((scenario, index) => (
        <div
          key={index}
          className="group w-96 bg-white rounded-lg pt-10 pl-8 pr-10 pb-8 text-black-light cursor-pointer relative"
        >
          <BookmarkIcon scenarioID={scenario.id} onClick={onBookmarkIconClick} />
          <h3 className="uppercase text-sm mb-2">
            {CategoryOptions[scenario.category.results[0].id]}
          </h3>
          <h2 className="capitalize text-base font-bold mb-4 w-fit group-hover:bg-white-darkest duration-300 ease-out">
            {scenario.title}
          </h2>
          <p className="line-clamp-3 mb-4">{scenario.summary}</p>
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
        </div>
      ))}
    </>
  );
}
