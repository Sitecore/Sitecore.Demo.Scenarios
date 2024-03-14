import { getScenarioByID } from '@/api/queries/scenarios';
import ParentPage from '@/app/components/ParentPage';
import FavoritesPage from '@/app/favorites/page';
import Home from '@/app/page';
import { notFound } from 'next/navigation';

// `app/scenarios/[id]/page.tsx` is the UI for the `/scenarios/[id]` URL
export default async function ScenarioDetailsPage({ params }: { params: { id: string } }) {
  const scenario = await getScenarioByID(params.id);

  if (!scenario) return notFound();

  return (
    <>
      <div className="max-w-lg">
        <ParentPage homePage={<Home />} favoritesPage={<FavoritesPage />} />
      </div>
    </>
  );
}
