import { cookies } from 'next/headers';

import { getAllScenarios } from '@/api/queries/scenarios';
import IntroScreen from './components/IntroScreen';
import BrowseScreen from './components/BrowseScreen';
import NavBar from './components/NavBar';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const scenarios = await getAllScenarios();
  const cookieStore = cookies();
  const hasCookie = cookieStore.has('hasVisited');

  const isDemoPortalUser = Object.keys(searchParams).length > 0;

  // Skip intro screen if the user has visited before or if coming directly from the Demo Portal
  return hasCookie || isDemoPortalUser ? (
    <>
      <NavBar />
      <BrowseScreen scenarios={scenarios} />
    </>
  ) : (
    <IntroScreen />
  );
}
