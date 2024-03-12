'use client';

import { Scenario } from '@/interfaces/scenario';
import { SAVED_SCENARIOS_KEY } from '@/constants/scenario';
import ScenarioGrid from './ScenarioGrid';
import { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type SavedScenarioGridProps = {
  scenarios: Scenario[];
};

export default function SavedScenarioGrid({ scenarios }: SavedScenarioGridProps) {
  const [savedScenarios, setSavedScenarios] = useState([] as Scenario[]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSavedScenarios = useCallback(() => {
    setIsLoading(true);

    const savedScenarioIDs = localStorage.getItem(SAVED_SCENARIOS_KEY)?.split(',') ?? [];

    setSavedScenarios(scenarios.filter((scenario) => savedScenarioIDs.includes(scenario.id)) ?? []);
    setIsLoading(false);
  }, []);

  // Fetch the saved scenarios on initial load
  useEffect(() => fetchSavedScenarios(), []);

  if (isLoading) {
    return (
      <div className="grid-container">
        <Skeleton
          count={5}
          className="h-72"
          containerClassName="grid grid-cols-3 gap-6 py-4"
          inline={true}
        />
      </div>
    );
  }

  return savedScenarios?.length > 0 ? (
    <ScenarioGrid scenarios={savedScenarios} onBookmarkIconClick={fetchSavedScenarios} />
  ) : (
    // TODO: Implement empty state as in prototype
    <h1 className="grid-container font-bold text-4xl">No saved scenarios available</h1>
  );
}
