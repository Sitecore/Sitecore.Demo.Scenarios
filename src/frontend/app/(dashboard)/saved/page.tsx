import { getAllScenarios } from '@/api/queries/scenarios';
import SavedScenarioGrid from '../../components/SavedScenarioGrid';

export default async function SavedPage() {
  const scenarios = await getAllScenarios();

  return (
    <>
      <main className="main-grid-layout">
        <div className="h-full flex flex-col gap-6">
          <section className="grid-container">
            <h1 className="text-5xl font-bold">Saved</h1>
          </section>
          <section className="h-full overflow-auto custom-scrollbar">
            {scenarios && scenarios.length > 0 && <SavedScenarioGrid scenarios={scenarios} />}
          </section>
        </div>
      </main>
    </>
  );
}
