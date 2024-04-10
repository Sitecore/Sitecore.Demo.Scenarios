'use client';

import Image from 'next/image';
import { createHasVisitedCookie } from '../actions';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import IntroScreenFacets from './IntroScreenFacets';
import { WidgetsProvider } from '@sitecore-search/react';
import { config } from '@/services/searchSDK';

export default function IntroScreen() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [queryString, setQueryString] = useState('/');
  const router = useRouter();

  const commonCardStyles = `max-w-full w-[28rem] min-h-[31rem] px-10 py-16 bg-white rounded-lg text-center shadow-card-large hover:shadow-card-large-hover cursor-pointer transition-all duration-300`;

  const handleClick = useCallback((href: string) => {
    createHasVisitedCookie();
    router.push(href);
  }, []);

  return (
    <WidgetsProvider {...config}>
      <main className="main-grid-layout-vivid py-16 h-full overflow-auto custom-scrollbar">
        {isExpanded && (
          <div
            className="bg-black bg-opacity-10 absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
            onClick={() => setIsExpanded(false)}
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
              className={`relative w-full flex flex-col items-center justify-between py-4 lg:flex-row ${!isExpanded && 'gap-16 xl:gap-32'}`}
            >
              <div
                className={`${commonCardStyles} ${isAnimating && 'h-[31rem]'} ${isExpanded && 'flex flex-col items-stretch expand-width !py-10 !cursor-auto shadow-card-large-hover'}`}
                onClick={() => {
                  if (!isExpanded) {
                    setIsAnimating(true);
                    setIsExpanded(true);
                  }
                }}
                onAnimationEnd={() => setIsAnimating(false)}
              >
                <div className={`flex items-center flex-row flex-wrap`}>
                  <Image
                    className={`max-w-full h-auto transition-all duration-500 ${isExpanded ? 'ml-0 mr-8' : 'mx-auto mt-14 mb-20'}`}
                    src="/undraw_preferences_re_49in.svg"
                    alt="Personalize your experience logo"
                    height={isExpanded ? 65 : 176}
                    width={isExpanded ? 78 : 211}
                    unoptimized
                  />
                  <div className={`${isExpanded && 'text-left'} transition-all duration-300`}>
                    <h2 className="font-bold text-2xl">Personalize your experience</h2>
                    <p className="text-lg">by selecting topics that you are interested in</p>
                  </div>
                  {isExpanded && (
                    <button
                      className="button ml-auto fold-down"
                      onClick={() => handleClick(queryString)}
                    >
                      See personalized picks
                    </button>
                  )}
                </div>
                {isExpanded && (
                  <IntroScreenFacets
                    rfkId="rfkid_7"
                    onSelectedFacetsChange={(q) => setQueryString(q)}
                  />
                )}
              </div>

              <span
                className={`text-black-light font-bold text-2xl self-center ${isExpanded && 'hidden'}`}
              >
                or
              </span>

              <button
                className={`${commonCardStyles} flex flex-col items-center justify-end text-center ${isExpanded && 'hidden'}`}
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
    </WidgetsProvider>
  );
}
