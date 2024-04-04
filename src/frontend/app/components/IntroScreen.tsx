'use client';

import Image from 'next/image';
import { createHasVisitedCookie } from '../actions';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

const MOCK_DATA = {
  products: ['XM Cloud', 'CDP', 'OrderCloud', 'ContentHub ONE', 'Personalize'],
  templates: [
    'PLAY! Summit (XM Cloud)',
    'PLAY! Media',
    'PLAY! Shop',
    'Lighthouse (XP)',
    'PLAY! Brand Portal',
  ],
  categories: ['Content', 'Personalization', 'Search', 'Experimentation', 'eCommerce'],
};

export default function IntroScreen() {
  const [expanded, setExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const commonCardStyles = `max-w-full w-[28rem] min-h-[31rem] px-10 py-16 bg-white rounded-lg shadow-card-large hover:shadow-card-large-hover cursor-pointer transition-all duration-300`;

  const handleClick = useCallback((href: string) => {
    createHasVisitedCookie();
    router.push(href);
  }, []);

  return (
    <main className="main-grid-layout-vivid py-16 h-full overflow-auto custom-scrollbar">
      {expanded && (
        <div
          className="bg-black bg-opacity-10 absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
          onClick={() => setExpanded(false)}
        ></div>
      )}
      <div className="h-full flex flex-col items-center">
        <section className="max-w-[70%] mb-12">
          <Image
            src="/sitecore_demo_scenarios.svg"
            alt="Sitecore Demo Scenarios logo"
            height={57}
            width={525}
            unoptimized
            priority
            className="!max-w-full !h-auto"
          />
        </section>
        <section className="m-auto grid-container">
          <div
            className={`relative w-full flex flex-col items-center justify-between py-4 lg:flex-row ${!expanded && 'gap-16 xl:gap-32'}`}
          >
            <button
              className={`${commonCardStyles} ${isAnimating && 'h-[31rem]'} ${expanded && 'flex flex-col items-stretch expand-width !py-10 cursor-auto shadow-card-large-hover'}`}
              onClick={() => {
                if (!expanded) {
                  setIsAnimating(true);
                  setExpanded(true);
                }
              }}
              onAnimationEnd={() => setIsAnimating(false)}
            >
              <div className={`flex items-center flex-row flex-wrap`}>
                <Image
                  className={`max-w-full h-auto transition-all duration-500 ${expanded ? 'ml-0 mr-8' : 'mx-auto mt-14 mb-20'}`}
                  src="/undraw_preferences_re_49in.svg"
                  alt="Personalize your experience logo"
                  height={expanded ? 65 : 176}
                  width={expanded ? 78 : 211}
                  unoptimized
                />
                <div
                  className={`${expanded ? 'text-left' : 'text-center'} transition-all duration-300`}
                >
                  <h2 className="font-bold text-2xl">Personalize your experience</h2>
                  <p className="text-lg">by selecting topics that you are interested in</p>
                </div>
                {expanded && (
                  <button className="button ml-auto fold-down" onClick={() => handleClick('/')}>
                    See personalized picks
                  </button>
                )}
              </div>
              {expanded && (
                <div className="flex gap-8 my-auto transition-all duration-300 fold-down">
                  {Object.entries(MOCK_DATA).map(([key, values]) => (
                    <div key={key}>
                      <p className="font-bold uppercase tracking-wider mb-3">{key}</p>
                      <div className="flex flex-row flex-wrap gap-2 justify-center">
                        {values.map((value, index) => (
                          <button
                            key={index}
                            className="rounded-full bg-white-darkest px-4 py-[0.375rem] transition-colors hover:bg-gray-lightest "
                          >
                            {value}
                          </button>
                        ))}
                        <button className="px-1">+ 5 more</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </button>

            <span
              className={`text-black-light font-bold text-2xl self-center ${expanded && 'hidden'}`}
            >
              or
            </span>

            <button
              className={`${commonCardStyles} flex flex-col items-center justify-end text-center ${expanded && 'hidden'}`}
              onClick={() => handleClick('/')}
            >
              <Image
                className="max-w-full h-auto mt-14 mb-20"
                src="/undraw_onboarding_re_6osc.svg"
                alt="Browse all demo scenarios logo"
                height={176}
                width={211}
                unoptimized
              />
              <h2 className="font-bold text-2xl">Browse all demo scenarios</h2>
              <p className="text-lg">to learn more about what Sitecore can offer</p>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
