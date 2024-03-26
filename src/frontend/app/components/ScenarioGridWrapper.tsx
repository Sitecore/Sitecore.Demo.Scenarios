'use client';

import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Scenario } from '@/interfaces/scenario';
import { useSidebarContext } from '../context/sidebar';
import ScenarioGrid from './ScenarioGrid';

export default function ScenarioGridWrapper({
  scenarios,
  errorCard,
}: {
  scenarios: Scenario[] | null;
  errorCard: ReactNode;
}) {
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const params = useParams<{ id: string }>();
  const { scrollPos, setScrollPos } = useSidebarContext();

  useEffect(() => {
    if (!scrollRef.current || !params) return;
    scrollRef.current.scrollTo({ top: scrollPos.saved });
  }, [params, scenarios, scrollPos.saved]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !params) return;
    setScrollPos({ ...scrollPos, saved: scrollRef.current.scrollTop });
  }, []);

  return (
    <section
      className="h-full overflow-auto custom-scrollbar"
      ref={scrollRef}
      onScroll={!!params && handleScroll}
    >
      {scenarios && scenarios?.length > 0 ? <ScenarioGrid scenarios={scenarios} /> : errorCard}
    </section>
  );
}
