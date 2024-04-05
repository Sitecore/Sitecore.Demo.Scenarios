'use client';

import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useSidebarContext } from '../context/sidebar';
import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavBar({ noPageChange }: { noPageChange?: boolean }) {
  const { page, setPage } = useSidebarContext();
  const pathname = usePathname();

  useEffect(() => {
    pathname.includes('/saved') && setPage('saved');
  }, [pathname, setPage]);

  const handleLinkClick = useCallback(
    (page: 'home' | 'saved') => {
      setPage(page);
    },
    [setPage]
  );

  return (
    <aside className="w-24 h-full bg-white">
      <Image
        src="/sitecore.svg"
        alt="Sitecore Logo"
        width={40}
        height={40}
        className="absolute mt-16 mx-7"
        priority
      />
      <div className="flex flex-col items-center justify-center h-full">
        {noPageChange ? (
          <>
            <button
              className={`h-24 w-24 ${page === 'home' && 'active'} navbutton`}
              onClick={() => handleLinkClick('home')}
            >
              <FontAwesomeIcon icon={faSearch} className="h-6 w-6 m-9" />
            </button>
            <button
              className={`h-24 w-24 ${page === 'saved' && 'active'} navbutton`}
              onClick={() => handleLinkClick('saved')}
            >
              <FontAwesomeIcon icon={faBookmark} className="h-6 w-6 m-9" />
            </button>
          </>
        ) : (
          <>
            <Link
              href="/"
              className={`h-24 w-24 ${page === 'home' && 'active'} navbutton`}
              scroll={false}
              onClick={() => handleLinkClick('home')}
            >
              <FontAwesomeIcon icon={faSearch} className="h-6 w-6 m-9" />
            </Link>
            <Link
              href="/saved"
              className={`h-24 w-24 ${page === 'saved' && 'active'} navbutton`}
              scroll={false}
              onClick={() => handleLinkClick('saved')}
            >
              <FontAwesomeIcon icon={faBookmark} className="h-6 w-6 m-9" />
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
