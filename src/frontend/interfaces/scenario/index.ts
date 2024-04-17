import { JSONContent } from '@tiptap/react';

export enum CategoryOptions {
  taxonomy_categoryOptions_commerce = 'Commerce',
  taxonomy_categoryOptions_content = 'Content',
  taxonomy_categoryOptions_experimentation = 'Experimentation',
  taxonomy_categoryOptions_integration = 'Integration',
  taxonomy_categoryOptions_marketingAutomation = 'Marketing Automation',
  taxonomy_categoryOptions_personalization = 'Personalization',
  taxonomy_categoryOptions_search = 'Search',
}

export interface Category {
  id: keyof typeof CategoryOptions;
}

export enum ProductOptions {
  taxonomy_productOptions_cdp = 'CDP',
  taxonomy_productOptions_connect = 'Connect',
  taxonomy_productOptions_contentHub = 'Content Hub',
  taxonomy_productOptions_contentHubOne = 'Content Hub ONE',
  taxonomy_productOptions_discover = 'Discover',
  taxonomy_productOptions_ordercloud = 'OrderCloud',
  taxonomy_productOptions_personalize = 'Personalize',
  taxonomy_productOptions_search = 'Search',
  taxonomy_productOptions_send = 'Send',
  taxonomy_productOptions_xmCloud = 'XM Cloud',
}

export interface Product {
  id: keyof typeof ProductOptions;
}

export enum TemplateOptions {
  taxonomy_templateOptions_brandPortal = 'Brand Portal',
  taxonomy_templateOptions_lighthousexp = 'Lighthouse (XP)',
  taxonomy_templateOptions_playMedia = 'PLAY! Media',
  taxonomy_templateOptions_playShop = 'PLAY! Shop',
  taxonomy_templateOptions_playSummit = 'PLAY! Summit',
  taxonomy_templateOptions_playSummitxmCloudPlus = 'PLAY! Summit (XM Cloud Plus)',
  taxonomy_templateOptions_sitecoreSend = 'Sitecore Send',
}

export interface Template {
  id: keyof typeof TemplateOptions;
}

export enum PersonaOptions {
  taxonomy_personaOptions_cxManager = 'CX Manager',
  taxonomy_personaOptions_contentStrategist = 'Content Strategist',
  taxonomy_personaOptions_digitalMarketer = 'Digital Marketer',
  taxonomy_personaOptions_eCommerceManager = 'E-commerce Manager',
  taxonomy_personaOptions_uxDesigner = 'UX Designer',
}

export interface Persona {
  id: keyof typeof PersonaOptions;
}

export enum IntegrationOptions {
  taxonomy_integrationOptions_vercel = 'Vercel',
  taxonomy_integrationOptions_github = 'GitHub',
  taxonomy_integrationOptions_xmCloud = 'XM Cloud',
  taxonomy_integrationOptions_cdp = 'CDP',
  taxonomy_integrationOptions_connect = 'Connect',
  taxonomy_integrationOptions_contentHub = 'Content Hub',
  taxonomy_integrationOptions_contentHubOne = 'Content Hub One',
  taxonomy_integrationOptions_discover = 'Discover',
  taxonomy_integrationOptions_ordercloud = 'OrderCloud',
  taxonomy_integrationOptions_personalize = 'Personalize',
  taxonomy_integrationOptions_search = 'Search',
  taxonomy_integrationOptions_send = 'Send',
}

export interface Integration {
  id: keyof typeof IntegrationOptions;
}

export interface ScenarioImage {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
}

export interface ScenarioSection {
  id: string;
  name: string;
  text: TextField;
  images: ImagesField;
}

export interface Scenario {
  id: string;
  title: string;
  summary: string;
  category: {
    results: Category[];
  };
  products: {
    results: Product[];
  };
  templates: {
    results: Template[];
  };
  personas: {
    results: Persona[];
  };
  integrations: {
    results: Integration[];
  };
  text1: TextField;
  images1: ImagesField;
  text2: TextField;
  images2: ImagesField;
  text3: TextField;
  images3: ImagesField;
  text4: TextField;
  images4: ImagesField;
  text5: TextField;
  images5: ImagesField;
  text6: TextField;
  images6: ImagesField;
  text7: TextField;
  images7: ImagesField;
  text8: TextField;
  images8: ImagesField;
  text9: TextField;
  images9: ImagesField;
  text10: TextField;
  images10: ImagesField;
  scenarioSection: {
    results: ScenarioSection[];
  };
}

export interface AllScenariosResponse {
  data: {
    allScenario: {
      results: Scenario[];
    };
  };
}

export interface ScenarioResponse {
  data: {
    scenario: Scenario;
  };
}

export interface TextField {
  type: string;
  content: JSONContent[];
}

export interface ImagesField {
  results: ScenarioImage[];
}
