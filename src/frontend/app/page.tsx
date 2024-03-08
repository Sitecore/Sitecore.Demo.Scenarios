import { getAllScenarios } from '@/api/queries/scenarios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ScenarioGrid from './components/ScenarioGrid';
import NavBar from './components/NavBar';

export default async function Home() {
  const scenarios = await getAllScenarios();

  return (
    <>
      <NavBar />
      <main className="p-16 mx-24">
        <section className="sticky">
          <h1 className="text-5xl font-bold text-black-light">Browse</h1>
          <div className="relative max-w-96">
            <input
              className="w-full mt-6 rounded-[20px] px-5 h-10 shadow cursor-pointer focus:outline-none placeholder:text-black-light"
              type="text"
              placeholder="Search"
            />
            <FontAwesomeIcon icon={faSearch} className="h-4 absolute right-4 bottom-3" />
          </div>
        </section>
        <section className="flex flex-row flex-wrap gap-6 mt-10">
          {scenarios && scenarios.length > 0 ? (
            <ScenarioGrid scenarios={scenarios} />
          ) : (
            <h1 className="font-bold text-4xl">No scenarios available</h1>
          )}
        </section>
      </main>
    </>
  );
}
