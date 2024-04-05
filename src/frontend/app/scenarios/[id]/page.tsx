import { getAllScenarios, getScenarioByID } from '@/api/queries/scenarios';
import ParentPage from '@/app/components/ParentPage';
import ScenarioContent from '@/app/components/ScenarioContent';
import {
  CategoryOptions,
  PersonaOptions,
  ProductOptions,
  TemplateOptions,
} from '@/interfaces/scenario';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BrowseScreen from '@/app/components/BrowseScreen';
import SavedScreen from '@/app/components/SavedScreen';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const scenario = await getScenarioByID(params.id);
  if (!scenario) {
    return {};
  }

  const categories = scenario.category.results.map(function (k) {
    return CategoryOptions[k.id];
  });

  const products = scenario.products.results.map(function (k) {
    return ProductOptions[k.id];
  });

  const personas = scenario.personas.results.map(function (k) {
    return PersonaOptions[k.id];
  });

  const templates = scenario.templates.results.map(function (k) {
    return TemplateOptions[k.id];
  });

  return {
    title: scenario?.title,
    openGraph: {
      title: scenario?.title,
      description: scenario?.summary,
    },
    other: {
      categories: categories,
      products: products,
      personas: personas,
      templates: templates,
      scenarioID: scenario?.id,
    },
  };
}

export default async function ScenarioDetailsPage({ params }: { params: { id: string } }) {
  const scenarios = await getAllScenarios();
  const scenario = await getScenarioByID(params.id);

  if (!scenario) return notFound();

  return (
    <>
      <div className="flex w-full h-full">
        <div className="grid-sidebar basis-1/3 w-1/3 h-full max-w-lg">
          <ParentPage
            homePage={<BrowseScreen scenarios={scenarios} />}
            savedPage={<SavedScreen scenarios={scenarios} />}
          />
        </div>
        <ScenarioContent scenario={scenario} />
      </div>
    </>
  );
}
