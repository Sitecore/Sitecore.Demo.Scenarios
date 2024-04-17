import { SAVED_SCENARIOS_KEY } from '@/constants/scenario';
import { IntegrationOptions, ProductOptions } from '@/interfaces/scenario';

export const productIcons = {
  [ProductOptions.taxonomy_productOptions_cdp]:
    'https://ch.sitecoredemo.com/api/public/content/82ae0487035a4171ba3ae5d4146644a1?v=df4fc96e',
  [ProductOptions.taxonomy_productOptions_connect]:
    'https://ch.sitecoredemo.com/api/public/content/56f38285a2794e9989eda2d9d8870955?v=e787ee1b',
  [ProductOptions.taxonomy_productOptions_contentHub]:
    'https://ch.sitecoredemo.com/api/public/content/b9a88ea1cb674ff197c16306b6f071ee?v=b274d31c',
  [ProductOptions.taxonomy_productOptions_contentHubOne]:
    'https://ch.sitecoredemo.com/api/public/content/2a06129658524773a1b12983349dc1f3?v=8241aed8',
  [ProductOptions.taxonomy_productOptions_discover]:
    'https://ch.sitecoredemo.com/api/public/content/779dd4820b1e4c5683d150741823f8e2?v=870d151c',
  [ProductOptions.taxonomy_productOptions_ordercloud]:
    'https://ch.sitecoredemo.com/api/public/content/07983393aead4243a8e82be5c2b24cdc?v=04c6f555',
  [ProductOptions.taxonomy_productOptions_personalize]:
    'https://ch.sitecoredemo.com/api/public/content/29f243787f514f248b23dc63a5d3fe71?v=e161831c',
  [ProductOptions.taxonomy_productOptions_search]:
    'https://ch.sitecoredemo.com/api/public/content/deb827ca52054297b694721e48afef05?v=06658994',
  [ProductOptions.taxonomy_productOptions_send]:
    'https://ch.sitecoredemo.com/api/public/content/1394ed8cd2a04895902768c43a3b14bb?v=b5e09410',
  [ProductOptions.taxonomy_productOptions_xmCloud]:
    'https://ch.sitecoredemo.com/api/public/content/4eab402a23724aafb9813fe73adcc826?v=0381a9f3',
};

export const integrationIcons = {
  [IntegrationOptions.taxonomy_integrationOptions_vercel]:
    'https://ch.sitecoredemo.com/api/public/content/0706dcaa77ff49f19eb482875982641d?v=d7f98177',
  [IntegrationOptions.taxonomy_integrationOptions_github]:
    'https://ch.sitecoredemo.com/api/public/content/d150d161943f45d3813e7fc386283c42?v=47116566',
  [IntegrationOptions.taxonomy_integrationOptions_cdp]:
    'https://ch.sitecoredemo.com/api/public/content/82ae0487035a4171ba3ae5d4146644a1?v=df4fc96e',
  [IntegrationOptions.taxonomy_integrationOptions_connect]:
    'https://ch.sitecoredemo.com/api/public/content/56f38285a2794e9989eda2d9d8870955?v=e787ee1b',
  [IntegrationOptions.taxonomy_integrationOptions_contentHub]:
    'https://ch.sitecoredemo.com/api/public/content/b9a88ea1cb674ff197c16306b6f071ee?v=b274d31c',
  [IntegrationOptions.taxonomy_integrationOptions_contentHubOne]:
    'https://ch.sitecoredemo.com/api/public/content/2a06129658524773a1b12983349dc1f3?v=8241aed8',
  [IntegrationOptions.taxonomy_integrationOptions_discover]:
    'https://ch.sitecoredemo.com/api/public/content/779dd4820b1e4c5683d150741823f8e2?v=870d151c',
  [IntegrationOptions.taxonomy_integrationOptions_ordercloud]:
    'https://ch.sitecoredemo.com/api/public/content/07983393aead4243a8e82be5c2b24cdc?v=04c6f555',
  [IntegrationOptions.taxonomy_integrationOptions_personalize]:
    'https://ch.sitecoredemo.com/api/public/content/29f243787f514f248b23dc63a5d3fe71?v=e161831c',
  [IntegrationOptions.taxonomy_integrationOptions_search]:
    'https://ch.sitecoredemo.com/api/public/content/deb827ca52054297b694721e48afef05?v=06658994',
  [IntegrationOptions.taxonomy_integrationOptions_send]:
    'https://ch.sitecoredemo.com/api/public/content/1394ed8cd2a04895902768c43a3b14bb?v=b5e09410',
  [IntegrationOptions.taxonomy_integrationOptions_xmCloud]:
    'https://ch.sitecoredemo.com/api/public/content/4eab402a23724aafb9813fe73adcc826?v=0381a9f3',
};

// Save a scenario ID to localStorage
export const saveScenarioID = (scenarioID: string) => {
  const savedScenarioIDs = localStorage.getItem(SAVED_SCENARIOS_KEY)?.split(',') ?? [];

  localStorage.setItem(SAVED_SCENARIOS_KEY, [...savedScenarioIDs, scenarioID].join(','));
};

// Remove a scenario ID from localStorage
export const unsaveScenarioID = (scenarioID: string) => {
  const savedScenarioIDs = localStorage.getItem(SAVED_SCENARIOS_KEY)?.split(',') ?? [];

  localStorage.setItem(
    SAVED_SCENARIOS_KEY,
    savedScenarioIDs.filter((id) => id !== scenarioID).join(',')
  );
};

export const isSavedScenario = (scenarioID: string) =>
  localStorage.getItem(SAVED_SCENARIOS_KEY)?.split(',').includes(scenarioID) ?? false;
