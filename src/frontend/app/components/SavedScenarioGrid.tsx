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
      <div className="flex gap-6">
        <Skeleton count={15} containerClassName="w-96 flex-1" />
        <Skeleton count={15} containerClassName="w-96 flex-1" />
      </div>
    );
  }

  return savedScenarios?.length > 0 ? (
    <ScenarioGrid scenarios={savedScenarios} onBookmarkIconClick={fetchSavedScenarios} />
  ) : (
    <h1 className="font-bold text-4xl">No saved scenarios available</h1>
  );
}
