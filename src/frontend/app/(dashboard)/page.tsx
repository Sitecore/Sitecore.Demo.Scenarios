import { getAllScenarios } from '@/api/queries/scenarios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ScenarioGrid from '../components/ScenarioGrid';
import { CONTACT_US_URL } from '@/constants/scenario';
import ErrorCard from '../components/ErrorCard';

export default async function Home() {
  const scenarios = await getAllScenarios();

  return (
    <>
      <main className="main-grid-layout">
        <div className="h-full flex flex-col gap-6">
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
          <section className="h-full overflow-auto custom-scrollbar">
            {scenarios && scenarios.length > 0 ? (
              <ScenarioGrid scenarios={scenarios} />
            ) : (
              <ErrorCard
                title="Oops, we haven't found anything."
                subtitle="Try simplifying your search or drop us a line telling us what you need."
                button={{ text: 'Contact us', href: CONTACT_US_URL, target: '_blank' }}
              />
            )}
          </section>
        </div>
      </main>
    </>
  );
}
