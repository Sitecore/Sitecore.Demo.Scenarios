import { Suspense } from 'react';

import { getAllScenarios } from '@/api/queries/scenarios';
import NavBar from '@/app/components/NavBar';
import SavedScreen from '../components/SavedScreen';

export default async function SavedPage() {
  const scenarios = await getAllScenarios();

  return (
    <>
      <Suspense>
        <NavBar />
      </Suspense>
      <SavedScreen scenarios={scenarios} />
    </>
  );
}
