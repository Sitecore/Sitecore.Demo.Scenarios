'use client';

import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="w-24 bg-white">
      <Image
        src="/sitecore.svg"
        alt="Sitecore Logo"
        width={40}
        height={40}
        className="absolute mt-14 mx-7"
      />
      <div className="flex flex-col items-center justify-center h-full">
        <Link href="/" className={`h-24 w-24 ${pathname === '/' && 'bg-white-dark'}`}>
          <FontAwesomeIcon icon={faSearch} className="h-6 w-6 m-9" />
        </Link>
        <Link
          href="/favorites"
          className={`h-24 w-24 ${pathname === '/favorites' && 'bg-white-dark'}`}
        >
          <FontAwesomeIcon icon={faBookmark} className="h-6 w-6 m-9" />
        </Link>
      </div>
    </nav>
  );
}
