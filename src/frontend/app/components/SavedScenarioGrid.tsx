'use client';

import { Scenario } from '@/interfaces/scenario';
import { useEffect, useRef } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import ErrorCard from './ErrorCard';
import { useSidebarContext } from '../context/sidebar';
import { useParams } from 'next/navigation';
import ScenarioGridWrapper from './ScenarioGridWrapper';
import { useSavedScenariosContext } from '../context/savedScenarios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type SavedScenarioGridProps = {
  scenarios: Scenario[];
};

export default function SavedScenarioGrid({ scenarios }: SavedScenarioGridProps) {
  const { setPage } = useSidebarContext();

  const scrollRef = useRef<HTMLAnchorElement>(null);
  const params = useParams<{ id: string }>();
  const { scrollPos } = useSidebarContext();
  const { isLoading, savedScenarios } = useSavedScenariosContext();

  useEffect(() => {
    if (!scrollRef.current || !params) return;
    scrollRef.current.scrollTo({ top: scrollPos.saved });
  }, [params, scenarios, scrollPos.saved]);

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

  return (
    <ScenarioGridWrapper
      scenarios={savedScenarios}
      errorCard={
        <ErrorCard
          image={{
            src: '/undraw_add_notes_re_ln36.svg',
            alt: 'No saved scenarios logo',
            width: 300,
            height: 300,
            className: 'w-72 max-w-[60%]',
          }}
          title="There's nothing here yet."
          subtitle="Browse all scenarios to find your favorites and save them for easy access."
          button={{
            text: 'Browse all',
            href: '/',
            onClick: () => {
              setPage('home');
            },
          }}
        />
      }
    />
  );
}
