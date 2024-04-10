'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faClose } from '@fortawesome/free-solid-svg-icons';

import { Scenario } from '@/interfaces/scenario';
import TagList from './TagList';
import ScenarioContentBody from './ScenarioContentBody';
import BookmarkIcon from './BookmarkIcon';
import { useSidebarContext } from '../context/sidebar';
import ScenarioIntegrations from './ScenarioIntegrations';

export default function ScenarioContent({ scenario }: { scenario: Scenario }) {
  const searchParams = useSearchParams();

  const customScrollbarRef = useRef<HTMLDivElement>(null);
  const { page, resetScrollPos } = useSidebarContext();

  const scrollToTop = () => {
    if (customScrollbarRef.current) {
      customScrollbarRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={customScrollbarRef}
      className="relative basis-2/3 grow h-full p-16 overflow-y-auto custom-scrollbar bg-white shadow-card-large"
    >
      <div className="max-w-screen-lg mx-auto">
        <div className="rich-text">
          <h1>{scenario.title}</h1>
        </div>
        <p className="text-2xl leading-9 mb-4">{scenario.summary}</p>
        <TagList scenario={scenario} />
        <hr className="text-gray-light mt-10 mb-6" />
        <ScenarioIntegrations scenario={scenario} />
        <ScenarioContentBody scenario={scenario} />
      </div>
      <Link
        href={page === 'home' ? `/?${searchParams.toString()}` : `/saved`}
        onClick={resetScrollPos}
        className="button-round fixed top-8 right-6"
      >
        <FontAwesomeIcon icon={faClose} />
      </Link>
      <div className="fixed bottom-8 right-6">
        <button className="button-round mb-4">
          <BookmarkIcon scenarioID={scenario.id} />
        </button>
        <button onClick={scrollToTop} className="button-round">
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </section>
  );
}
