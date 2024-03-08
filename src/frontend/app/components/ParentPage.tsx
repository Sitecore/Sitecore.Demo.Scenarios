'use client';

import { isSavedScenario } from '@/helpers/scenario';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ParentPage({
  homePage,
  favoritesPage,
}: {
  homePage: JSX.Element;
  favoritesPage: JSX.Element;
}) {
  const { id } = useParams();
  const [showFavoritesPage, setShowFavoritesPage] = useState(false);

  // Check if current route belongs to a saved scenario details page
  useEffect(() => {
    setShowFavoritesPage(isSavedScenario(id as string));
  }, []);

  return <>{showFavoritesPage ? favoritesPage : homePage}</>;
}
