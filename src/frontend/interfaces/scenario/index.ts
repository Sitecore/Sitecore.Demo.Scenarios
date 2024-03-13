import { JSONContent } from '@tiptap/react';

export enum CategoryOptions {
  taxonomy_categoryoptions_commerce = 'Commerce',
  taxonomy_categoryoptions_content = 'Content',
  taxonomy_categoryoptions_experimentation = 'Experimentation',
  taxonomy_categoryoptions_integration = 'Integration',
  taxonomy_categoryoptions_marketingAutomation = 'Marketing Automation',
  taxonomy_categoryoptions_personalization = 'Personalization',
  taxonomy_categoryoptions_search = 'Search',
}

export interface Category {
  id: keyof typeof CategoryOptions;
}

export enum ProductOptions {
  taxonomy_productoptions_cdp = 'CDP',
  taxonomy_productoptions_connect = 'Connect',
  taxonomy_productoptions_contentHub = 'Content Hub',
  taxonomy_productoptions_contentHubOne = 'Content Hub ONE',
  taxonomy_productoptions_discover = 'Discover',
  taxonomy_productoptions_ordercloud = 'OrderCloud',
  taxonomy_productoptions_personalize = 'Personalize',
  taxonomy_productoptions_search = 'Search',
  taxonomy_productoptions_send = 'Send',
  taxonomy_productoptions_xmCloud = 'XM Cloud',
}

export interface Product {
  id: keyof typeof ProductOptions;
}

export enum TemplateOptions {
  taxonomy_templateoptions_brandPortal = 'Brand Portal',
  taxonomy_templateoptions_lighthousexp = 'Lighthouse (XP)',
  taxonomy_templateoptions_playMedia = 'PLAY! Media',
  taxonomy_templateoptions_playShop = 'PLAY! Shop',
  taxonomy_templateoptions_playSummit = 'PLAY! Summit',
  taxonomy_templateoptions_playSummitxmCloudPlus = 'PLAY! Summit (XM Cloud Plus)',
  taxonomy_templateoptions_sitecoreSend = 'Sitecore Send',
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
