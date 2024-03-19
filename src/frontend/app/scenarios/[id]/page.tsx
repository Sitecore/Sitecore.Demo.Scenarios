import { getScenarioByID } from '@/api/queries/scenarios';
import ParentPage from '@/app/components/ParentPage';
import ScenarioContent from '@/app/components/ScenarioContent';
import SavedPage from '@/app/(dashboard)/saved/page';
import Home from '@/app/(dashboard)/page';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const scenario = await getScenarioByID(params.id);

  return {
    title: scenario?.title,
    openGraph: {
      title: scenario?.title,
      description: scenario?.summary,
    },
  };
}

// `app/scenarios/[id]/page.tsx` is the UI for the `/scenarios/[id]` URL
export default async function ScenarioDetailsPage({ params }: { params: { id: string } }) {
  const scenario = await getScenarioByID(params.id);

  if (!scenario) return notFound();

  return (
    <>
      <div className="flex w-full h-full">
        <div className="grid-sidebar basis-1/3 w-1/3 h-full max-w-lg">
          <ParentPage homePage={<Home />} savedPage={<SavedPage />} />
        </div>
        <ScenarioContent scenario={scenario} />
      </div>
    </>
  );
}
