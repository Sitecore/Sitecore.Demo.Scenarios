'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CONTACT_US_URL } from '@/constants/scenario';
import ErrorCard from '../components/ErrorCard';
import { Scenario } from '@/interfaces/scenario';
import { useEffect } from 'react';
import { createHasVisitedCookie } from '../actions';
import ScenarioGridWrapper from './ScenarioGridWrapper';
import { WidgetsProvider } from '@sitecore-search/react';
import { config } from '../../services/searchSDK';

export default function BrowseScreen({ scenarios }: { scenarios: Scenario[] | null }) {
  useEffect(() => {
    createHasVisitedCookie();
  }, []);

  return (
    <WidgetsProvider {...config}>
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
          <ScenarioGridWrapper
            scenarios={scenarios}
            errorCard={
              <ErrorCard
                title="Oops, we haven't found anything."
                subtitle="Try simplifying your search or drop us a line telling us what you need."
                button={{ text: 'Contact us', href: CONTACT_US_URL, target: '_blank' }}
              />
            }
          />
        </div>
      </main>
    </WidgetsProvider>
  );
}
