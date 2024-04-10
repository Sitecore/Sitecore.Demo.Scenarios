'use client';

import { useCallback, useEffect, useState } from 'react';
import { WidgetsProvider } from '@sitecore-search/react';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CONTACT_US_URL, DEMO_PORTAL_USER_KEY } from '@/constants/scenario';
import ErrorCard from '../components/ErrorCard';
import { Scenario } from '@/interfaces/scenario';
import { createHasVisitedCookie } from '../actions';
import ScenarioGridWrapper from './ScenarioGridWrapper';
import { config } from '../../services/searchSDK';
import BrowseScreenSearchWidget from './BrowseScreenSearchWidget';
import { useSearchParams } from 'next/navigation';

export default function BrowseScreen({ scenarios }: { scenarios: Scenario[] | null }) {
  const searchParams = useSearchParams();

  const [filteredScenarios, setFilteredScenarios] = useState(scenarios ?? []);
  const [showDemoPortalNotification, setShowDemoPortalNotification] = useState(
    searchParams.get(DEMO_PORTAL_USER_KEY) === 'true'
  );

  const updateFilteredScenarios = useCallback(
    (filteredScenarioIDs: string[]) => {
      setFilteredScenarios(
        scenarios?.filter((scenario) => filteredScenarioIDs.includes(scenario.id)) ?? []
      );
    },
    [scenarios]
  );

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
          {showDemoPortalNotification && (
            <section className="absolute top-6 right-6 notification-card animate-[bounceDown_2s_ease-out_1]">
              <h3 className="font-bold text-xl">You seem to be coming from the Demo Portal!</h3>
              <p>We&apos;ve added some filters to help you get started with your demo.</p>
              <FontAwesomeIcon
                className="h-4 w-4 align-middle absolute top-3 right-3 cursor-pointer"
                icon={faRemove}
                onClick={() => setShowDemoPortalNotification(false)}
              />
            </section>
          )}
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
