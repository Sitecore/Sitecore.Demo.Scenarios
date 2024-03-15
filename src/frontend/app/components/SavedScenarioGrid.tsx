'use client';

import { Scenario } from '@/interfaces/scenario';
import { SAVED_SCENARIOS_KEY } from '@/constants/scenario';
import ScenarioGrid from './ScenarioGrid';
import { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className="grid-container max-w-fit">
      <div className="bg-white flex flex-col items-center rounded-lg py-20 px-16 transition-all shadow-card hover:shadow-card-hover">
        <Image
          src="/undraw_add_notes_re_ln36.svg"
          alt="No saved scenarios logo"
          width={300}
          height={300}
          className="w-auto"
          priority
          unoptimized
        />
        <h2 className="font-bold text-3xl text-black-light mt-16">There's nothing here yet.</h2>
        <p className="text-xl text-black-light">
          Browse all scenarios to find your favorites and save them for easy access.{' '}
        </p>
        <Link className="text-lg text-white mt-8 py-4 px-10 rounded-full bg-violet" href="/">
          Browse all
        </Link>
      </div>
    </div>
  );
}
