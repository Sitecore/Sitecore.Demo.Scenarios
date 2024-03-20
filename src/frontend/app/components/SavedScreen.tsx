import SavedScenarioGrid from '../components/SavedScenarioGrid';
import { Scenario } from '@/interfaces/scenario';

export default async function SavedScreen({ scenarios }: { scenarios: Scenario[] | null }) {
  return (
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
  );
}
