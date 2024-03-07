// `app/favorites/page.tsx` is the UI for the `/favorites` URL
import { getAllScenarios } from '@/api/queries/scenarios';
import SavedScenarioGrid from '../components/SavedScenarioGrid';

export default async function FavoritesPage() {
  const scenarios = await getAllScenarios();

  return (
    <main>
      <section className="mt-16 mx-64 sticky">
        <h1 className="text-5xl font-bold text-black-light">Saved</h1>
      </section>
      <section className="flex flex-row gap-6 mx-64 mt-10">
        {scenarios && scenarios.length > 0 && <SavedScenarioGrid scenarios={scenarios} />}
      </section>
    </main>
  );
}
