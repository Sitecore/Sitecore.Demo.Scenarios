'use client';

import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Scenario } from '@/interfaces/scenario';
import { useSidebarContext } from '../context/sidebar';
import ScenarioGrid from './ScenarioGrid';

export default function ScenarioGridWrapper({
  scenarios,
  errorCard,
  isLoading = false,
}: {
  scenarios: Scenario[] | null;
  errorCard: ReactNode;
  isLoading?: boolean;
}) {
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const params = useParams<{ id: string }>();
  const { page, scrollPos, setScrollPos } = useSidebarContext();

  const pathname = usePathname();
  const isScenarioDetailsPage = pathname.includes('/scenarios');

  useEffect(() => {
    if (!scrollRef.current || !params?.id) return;
    scrollRef.current.scrollTo({ top: scrollPos[page] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !params?.id) return;
    setScrollPos({ ...scrollPos, [page]: scrollRef.current.scrollTop });
  }, [page, params, scrollPos, setScrollPos]);

  if (isLoading) {
    return isScenarioDetailsPage ? (
      <div className="grid-container">
        <Skeleton count={1} className="h-72" />
      </div>
    ) : (
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
    <section
      className="h-full overflow-auto custom-scrollbar"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {scenarios && scenarios?.length > 0 ? <ScenarioGrid scenarios={scenarios} /> : errorCard}
    </section>
  );
}
