import { fetchGraphQL } from '@/api';
import { AllScenariosResponse, Scenario, ScenarioResponse } from '@/interfaces/scenario';

const imagesQuery = `
  results {
    id
    name
    description
    fileUrl
  }
`;

const getFieldsQuery = () => {
  const emptyArray = Array.from({ length: 10 });

  const result = emptyArray.map((_, index) => {
    const text = `
      text${index + 1}
      images${index + 1} {
        ${imagesQuery}
      }
    `;
    return text;
  });

  return result.join('');
};

const scenariosQuery = `
  {
    allScenario {
      total
      results {
        id
        title
        summary
        category {
          results {
            id
          }
        }
        products {
          results {
            id
          }
        }
        templates {
          results {
            id
          }
        }
        personas {
          results {
            id
          }
        }
      }
    }
  }
`;

export const getAllScenarios = async (): Promise<Scenario[] | null> => {
  try {
    const results = (await fetchGraphQL(scenariosQuery)) as AllScenariosResponse;

    return results?.data?.allScenario?.results;
  } catch {
    return null;
  }
};

const getScenarioByIDQuery = (id: string) => `
  {
    scenario(id: "${id}") {
      id
      title
      summary
      category {
        results {
          id
        }
      }
      products {
        results {
          id
        }
      }
      templates {
        results {
          id
        }
      }
      personas {
        results {
          id
        }
      }
      integrations {
        results {
          id
        }
      }
      ${getFieldsQuery()}
      scenarioSection {
        results {
        ... on ScenarioSection {
            id
            name
            text
            images {
              ${imagesQuery}
            }
          }
        }
      }
    }
  }
`;

export const getScenarioByID = async (id: string): Promise<Scenario | null> => {
  try {
    const response = (await fetchGraphQL(getScenarioByIDQuery(id))) as ScenarioResponse;

    return response?.data?.scenario;
  } catch {
    return null;
  }
};
