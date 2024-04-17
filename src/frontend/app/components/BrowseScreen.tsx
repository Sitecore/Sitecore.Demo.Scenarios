'use client';

import { useCallback, useEffect, useState } from 'react';
import { WidgetsProvider } from '@sitecore-search/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  BROWSE_SCREEN_QUERYSTRING_KEY,
  CONTACT_US_URL,
  DEMO_PORTAL_USER_KEY,
} from '@/constants/scenario';
import ErrorCard from '../components/ErrorCard';
import { Scenario } from '@/interfaces/scenario';
import { createHasVisitedCookie } from '../actions';
import ScenarioGridWrapper from './ScenarioGridWrapper';
import { config } from '../../services/searchSDK';
import BrowseScreenSearchWidget from './BrowseScreenSearchWidget';
import NotificationCard from './NotificationCard';

export default function BrowseScreen({ scenarios }: { scenarios: Scenario[] | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filteredScenarios, setFilteredScenarios] = useState(scenarios ?? []);
  const [isLoading, setIsLoading] = useState(true);
  const [showDemoPortalNotification, setShowDemoPortalNotification] = useState(
    searchParams.get(DEMO_PORTAL_USER_KEY) === 'true'
  );
  const [showReturningUserNotification, setShowReturningUserNotification] = useState(false);

  const updateFilteredScenarios = useCallback(
    (filteredScenarioIDs: string[]) => {
      setFilteredScenarios(
        scenarios?.filter((scenario) => filteredScenarioIDs.includes(scenario.id)) ?? []
      );
      setTimeout(() => setIsLoading(false), 1000);
    },
    [scenarios]
  );

  const handleStartOverClick = useCallback(() => {
    localStorage.setItem(BROWSE_SCREEN_QUERYSTRING_KEY, '');

    // In order for BrowseScreenSearchWidget to refresh
    window.location.href = '/';
  }, []);

  useEffect(() => {
    createHasVisitedCookie();
  }, []);

  // Retrieve querystring params from localStorage, if not already present in the URL
  // If already present in the URL, update localStorage and return
  useEffect(() => {
    if (searchParams.toString()) {
      // Remove isDemoPortalUser param so that we don't constantly display the notification
      const queryParams = new URLSearchParams(searchParams.toString());
      queryParams.delete(DEMO_PORTAL_USER_KEY);
      localStorage.setItem(BROWSE_SCREEN_QUERYSTRING_KEY, queryParams.toString());
      router.push(`${pathname}?${queryParams}`);
      return;
    }

    const queryParams = localStorage.getItem(BROWSE_SCREEN_QUERYSTRING_KEY);
    if (queryParams) {
      setShowReturningUserNotification(true);
      router.push(`${pathname}?${queryParams}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <NotificationCard
              title="You seem to be coming from the Demo Portal!"
              subtitle={
                <p>We&apos;ve added some filters to help you get started with your demo.</p>
              }
              onRemoveIconClick={() => setShowDemoPortalNotification(false)}
            />
          )}
          {showReturningUserNotification && (
            <NotificationCard
              title="Continue where you left off..."
              subtitle={
                <p>
                  We&apos;ve kept your search from last time but you can also{' '}
                  <span className="cursor-pointer underline" onClick={handleStartOverClick}>
                    start over
                  </span>
                  .
                </p>
              }
              onRemoveIconClick={() => setShowReturningUserNotification(false)}
            />
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
            isLoading={isLoading}
          />
        </div>
      </main>
    </WidgetsProvider>
  );
}
