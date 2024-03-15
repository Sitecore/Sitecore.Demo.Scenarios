import { getAllScenarios } from '@/api/queries/scenarios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ScenarioGrid from './components/ScenarioGrid';
import { CONTACT_US_URL } from '@/constants/scenario';
import Link from 'next/link';

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
              <div className="grid-container flex flex-col bg-white rounded-lg items-center py-20 px-16 max-w-fit transition-all shadow-card hover:shadow-card-hover">
                <h2 className="font-bold text-3xl text-black-light">
                  Oops, we haven't found anything.
                </h2>
                <p className="text-xl text-black-light">
                  Try simplifying your search or drop us a line telling us what you need.
                </p>
                <Link
                  className="text-lg text-white mt-8 py-4 px-10 rounded-full bg-violet"
                  href={CONTACT_US_URL}
                  target="_blank"
                >
                  Contact us
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
