'use client';

import Image from 'next/image';
import { createHasVisitedCookie } from '../actions';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function IntroScreen() {
  const router = useRouter();

  const handleClick = useCallback((href: string) => {
    createHasVisitedCookie();
    router.push(href);
  }, []);

  return (
    <main className="main-grid-layout-vivid py-16">
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
        <section className="m-auto">
          <div className="flex flex-col gap-16 py-4 grid-container lg:flex-row xl:gap-32">
            <button
              className="flex flex-col items-center justify-end bg-white rounded-lg px-10 py-16 max-w-md transition-all cursor-pointer shadow-card-large hover:shadow-card-large-hover"
              onClick={() => handleClick('/')}
            >
              <Image
                className="max-w-full h-auto mt-14 mb-20"
                src="/undraw_preferences_re_49in.svg"
                alt="Personalize your experience logo"
                height={176}
                width={211}
                unoptimized
              />
              <h2 className="font-bold text-2xl text-center">Personalize your experience</h2>
              <p className="text-lg text-center">by selecting topics that you are interested in</p>
            </button>

            <span className="text-black-light font-bold text-2xl self-center">or</span>

            <button
              className="flex flex-col items-center justify-end bg-white rounded-lg px-10 py-16 max-w-md transition-all cursor-pointer shadow-card hover:shadow-card-hover"
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
              <h2 className="font-bold text-2xl text-center">Browse all demo scenarios</h2>
              <p className="text-lg text-center">to learn more about what Sitecore can offer</p>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
