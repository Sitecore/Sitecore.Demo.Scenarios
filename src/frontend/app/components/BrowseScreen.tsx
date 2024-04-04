'use client';

import { useCallback, useEffect, useState } from 'react';
import { WidgetsProvider } from '@sitecore-search/react';

import { CONTACT_US_URL } from '@/constants/scenario';
import ErrorCard from '../components/ErrorCard';
import { Scenario } from '@/interfaces/scenario';
import { createHasVisitedCookie } from '../actions';
import ScenarioGridWrapper from './ScenarioGridWrapper';
import { config } from '../../services/searchSDK';
import BrowseScreenSearchWidget from './BrowseScreenSearchWidget';

export default function BrowseScreen({ scenarios }: { scenarios: Scenario[] | null }) {
  const [filteredScenarios, setFilteredScenarios] = useState(scenarios ?? []);

  const updateFilteredScenarios = useCallback((filteredScenarioIDs: string[]) => {
    setFilteredScenarios(
      scenarios?.filter((scenario) => filteredScenarioIDs.includes(scenario.id)) ?? []
    );
  }, []);

  useEffect(() => {
    createHasVisitedCookie();
  }, []);

  return (
    <WidgetsProvider {...config}>
      <main className="main-grid-layout">
        <div className="h-full flex flex-col gap-6">
          <section className="grid-container">
            <h1 className="text-5xl font-bold mb-6">Browse</h1>
            <BrowseScreenSearchWidget rfkId="rfkid_7" onFilterScenarios={updateFilteredScenarios} />
          </section>
          <ScenarioGridWrapper
            scenarios={filteredScenarios}
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
