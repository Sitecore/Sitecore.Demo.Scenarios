import { getAllScenarios } from '@/api/queries/scenarios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ScenarioGrid from './components/ScenarioGrid';

export default async function Home() {
  const scenarios = await getAllScenarios();

  return (
    <>
      <main className="main-grid-layout">
        <div className="max-h-full flex flex-col gap-6">
          <section className="grid-container">
            <h1 className="text-5xl font-bold mb-6">Browse</h1>
            <div className="relative max-w-96">
              <input
                className="w-full rounded-full pl-5 pr-10 pt-1 h-10 shadow-element cursor-pointer focus:outline-none placeholder:text-black-light"
                type="text"
                placeholder="Search"
              />
              <FontAwesomeIcon icon={faSearch} className="h-4 absolute right-4 bottom-3" />
            </div>
          </section>
          <section className="overflow-auto custom-scrollbar">
            {scenarios && scenarios.length > 0 ? (
              <ScenarioGrid scenarios={scenarios} />
            ) : (
              // TODO: Implement empty state as in prototype
              <h1 className="grid-container font-bold text-4xl">No scenarios available</h1>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
