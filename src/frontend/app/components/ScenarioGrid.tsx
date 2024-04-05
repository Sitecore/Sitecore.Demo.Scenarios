'use client';

import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { CategoryOptions, Scenario } from '@/interfaces/scenario';
import BookmarkIcon from './BookmarkIcon';
import TagList from './TagList';
import { useSidebarContext } from '../context/sidebar';
import { getElementPosition, isElementInView } from '@/helpers/ui';

type ScenarioGridProps = {
  scenarios: Scenario[];
};

export default function ScenarioGrid({ scenarios }: ScenarioGridProps) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const { page, scrollPos, setScrollPos } = useSidebarContext();

  // Adjust sidebar scroll to show the selected scenario after page reload
  useEffect(() => {
    if (scrollPos[page] === undefined) {
      const scenarioCard = scrollRef.current;
      const scrollContainer = scenarioCard?.parentElement?.parentElement;

      if (!scenarioCard || !scrollContainer || !params.id) return;

      const isScenarioInView = isElementInView(scenarioCard, scrollContainer);

      if (!isScenarioInView) {
        const _scrollPos = getElementPosition(scenarioCard, scrollContainer);
        setScrollPos({ ...scrollPos, [page]: _scrollPos });
      }
    }
  }, [page, params.id, scrollPos, setScrollPos]);

  const handleScenarioClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      // Check if bookmark icon was clicked and return with no redirect
      const tagName = (e.target as HTMLElement).tagName;
      if (tagName === 'path' || tagName === 'svg') {
        return;
      }

      const href = (e?.currentTarget as HTMLAnchorElement).href;
      router.push(href);
    },
    [router]
  );

  return (
    <div className="flex flex-wrap gap-6 py-4 grid-container">
      {scenarios.map((scenario) => (
        <Link
          key={scenario.id}
          className="group relative bg-white rounded-lg shadow-card py-10 px-8 basis-[calc(33.33%-1rem)] flex-grow min-w-96 transition-all cursor-pointer hover:shadow-card-hover"
          href={`/scenarios/${scenario.id}`}
          ref={scenario.id === params.id ? scrollRef : undefined}
          onClick={handleScenarioClick}
        >
          <BookmarkIcon scenarioID={scenario.id} className={'h-6 absolute right-5 top-5'} />
          <h3 className="uppercase text-sm mb-1 tracking-wider font-medium">
            {CategoryOptions[scenario.category.results[0].id]}
          </h3>
          <h2 className="capitalize text-2xl font-bold mb-2">
            <span
              className={`text-highlight ${scenario.id === params.id ? 'text-highlight-hover' : ''} group-hover:text-highlight-hover`}
            >
              {scenario.title}
            </span>
          </h2>
          <p className="line-clamp-3 mb-3">{scenario.summary}</p>
          <TagList scenario={scenario} />
        </Link>
      ))}
      <div className="basis-[calc(33.33%-1rem)] flex-grow min-w-96"></div>
      <div className="basis-[calc(33.33%-1rem)] flex-grow min-w-96"></div>
    </div>
  );
}
