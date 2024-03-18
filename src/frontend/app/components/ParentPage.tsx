'use client';

import { useSidebarContext } from '../context/sidebar';

export default function ParentPage({
  homePage,
  favoritesPage,
}: {
  homePage: JSX.Element;
  favoritesPage: JSX.Element;
}) {
  const { page } = useSidebarContext();

  return <>{page === 'home' ? homePage : favoritesPage}</>;
}
