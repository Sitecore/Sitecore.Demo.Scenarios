import { getAllScenarios } from '@/api/queries/scenarios';
import { MetadataRoute } from 'next';
import { env } from 'process';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const scenarios = (await getAllScenarios()) || [];

  return scenarios.map((scenario) => ({
    url: `${env.BASE_URL}/scenarios/${scenario.id}`,
  }));
}
