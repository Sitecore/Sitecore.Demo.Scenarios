import { getScenarioByID } from '@/api/queries/scenarios';
import ParentPage from '@/app/components/ParentPage';
import ScenarioContent from '@/app/components/ScenarioContent';
import FavoritesPage from '@/app/favorites/page';
import Home from '@/app/page';
import { notFound } from 'next/navigation';

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
