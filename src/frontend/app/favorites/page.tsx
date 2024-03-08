// `app/favorites/page.tsx` is the UI for the `/favorites` URL
import { getAllScenarios } from '@/api/queries/scenarios';
import SavedScenarioGrid from '../components/SavedScenarioGrid';
import NavBar from '../components/NavBar';

export default async function FavoritesPage() {
  const scenarios = await getAllScenarios();

  return (
    <>
      <NavBar />
      <main>
        <section className="sticky">
          <h1 className="text-5xl font-bold text-black-light">Saved</h1>
        </section>
        <section className="flex flex-row flex-wrap gap-6 mt-10">
          {scenarios && scenarios.length > 0 && <SavedScenarioGrid scenarios={scenarios} />}
        </section>
      </main>
    </>
  );
}
