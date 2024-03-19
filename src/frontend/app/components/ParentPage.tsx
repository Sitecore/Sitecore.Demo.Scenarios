'use client';

import { useSidebarContext } from '../context/sidebar';

export default function ParentPage({
  homePage,
  savedPage,
}: {
  homePage: JSX.Element;
  savedPage: JSX.Element;
}) {
  const { page } = useSidebarContext();

  return <>{page === 'home' ? homePage : savedPage}</>;
}
