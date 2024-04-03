import { cookies } from 'next/headers';
import { getAllScenarios } from '@/api/queries/scenarios';
import IntroScreen from './components/IntroScreen';
import BrowseScreen from './components/BrowseScreen';
import NavBar from './components/NavBar';

export default async function Home() {
  const scenarios = await getAllScenarios();
  const cookieStore = cookies();
  const hasCookie = cookieStore.has('hasVisited');

  return hasCookie ? (
    <>
      <NavBar />
      <BrowseScreen scenarios={scenarios} />
    </>
  ) : (
    <IntroScreen />
  );
}
