import { getScenarioByID } from '@/api/queries/scenarios';
import ParentPage from '@/app/components/ParentPage';
import ScenarioContent from '@/app/components/ScenarioContent';
import FavoritesPage from '@/app/favorites/page';
import Home from '@/app/page';
import {
  CategoryOptions,
  PersonaOptions,
  ProductOptions,
  TemplateOptions,
} from '@/interfaces/scenario';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const scenario = await getScenarioByID(params.id);
  if (!scenario) {
    return {};
  }

  const categories = scenario.category.results
    .map(function (k) {
      return CategoryOptions[k.id];
    });

  const products = scenario.products.results
    .map(function (k) {
      return ProductOptions[k.id];
    });

  const personas = scenario.personas.results
    .map(function (k) {
      return PersonaOptions[k.id];
    });

  const templates = scenario.templates.results
    .map(function (k) {
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
    },
  };
}

// `app/scenarios/[id]/page.tsx` is the UI for the `/scenarios/[id]` URL
export default async function ScenarioDetailsPage({ params }: { params: { id: string } }) {
  const scenario = await getScenarioByID(params.id);

  if (!scenario) return notFound();

  return (
    <>
      <div className="flex w-full h-full">
        <div className="grid-sidebar basis-1/3 w-1/3 h-full max-w-lg">
          <ParentPage homePage={<Home />} favoritesPage={<FavoritesPage />} />
        </div>
        <ScenarioContent scenario={scenario} />
      </div>
    </>
  );
}
