'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

export default function IntroPage() {
  return (
    <>
      <main className="main-grid-layout">
        <div className="max-h-full flex flex-col gap-20 items-center">
          <section>
            <Image
              src="/sitecore_demo_scenarios.svg"
              alt="Sitecore Demo Scenarios logo"
              height={57}
              width={525}
              unoptimized
              priority
            />
          </section>
          <section className="overflow-auto custom-scrollbar">
              <div className="flex flex-col flex-wrap gap-16 py-4 grid-container xl:flex-row xl:gap-32">
                <Link
                  className="relative bg-white rounded-lg py-10 px-8 basis-[calc(33.33%-1rem)] flex-grow min-w-96 transition-all cursor-pointer items-center shadow-card hover:shadow-card-hover"
                  href={'#'}
                >
                  <Image
                    className="mx-auto"
                    src="/undraw_preferences_re_49in.svg"
                    alt="Personalize your experience logo"
                    height={176}
                    width={211}
                    unoptimized
                  />
                  <h2 className="font-bold text-2xl mt-20 text-center">
                    Personalize your experience
                  </h2>
                  <p className="text-lg mt-3 text-center">
                    by selecting topics that you are interested in
                  </p>
                </Link>
                <span className="text-black-light font-bold text-2xl self-center">or</span>
                <Link
                  className="relative bg-white rounded-lg py-10 px-8 basis-[calc(33.33%-1rem)] flex-grow min-w-96 transition-all cursor-pointer items-center shadow-card hover:shadow-card-hover"
                  href={'/'}
                >
                  <Image
                    className="mx-auto"
                    src="/undraw_onboarding_re_6osc.svg"
                    alt="Browse all demo scenarios logo"
                    height={176}
                    width={211}
                    unoptimized
                  />
                  <h2 className="font-bold text-2xl mt-20 text-center">
                    Browse all demo scenarios
                  </h2>
                  <p className="text-lg mt-3 text-center">
                    to learn more about what Sitecore can offer
                  </p>
                </Link>
              </div>
          </section>
        </div>
      </main>
    </>
  );
}
