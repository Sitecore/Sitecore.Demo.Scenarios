'use client';

import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isSavedScenario } from '@/helpers/scenario';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const isFavoritesRoute = pathname.includes('/favorites');

  const [isSavedScenarioDetailsPage, setIsSavedScenarioDetailsPage] = useState(false);

  // Check if current route belongs to a saved scenario details page
  useEffect(() => {
    setIsSavedScenarioDetailsPage(isSavedScenario(pathname.split('/')[2]));
  }, []);

  return (
    <aside className="w-24 h-full bg-white fixed">
      <Image
        src="/sitecore.svg"
        alt="Sitecore Logo"
        width={40}
        height={40}
        className="absolute mt-14 mx-7"
        priority
      />
      <div className="flex flex-col items-center justify-center h-full">
        <Link
          href="/"
          className={`h-24 w-24 ${!isFavoritesRoute && !isSavedScenarioDetailsPage && 'bg-white-dark'}`}
          scroll={false}
        >
          <FontAwesomeIcon icon={faSearch} className="h-6 w-6 m-9" />
        </Link>
        <Link
          href="/favorites"
          className={`h-24 w-24 ${(isFavoritesRoute || isSavedScenarioDetailsPage) && 'bg-white-dark'}`}
          scroll={false}
        >
          <FontAwesomeIcon icon={faBookmark} className="h-6 w-6 m-9" />
        </Link>
      </div>
    </aside>
  );
}
