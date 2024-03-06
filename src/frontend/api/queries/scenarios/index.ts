import { fetchGraphQL } from '@/api';
import { AllScenariosResponse, Scenario, ScenarioResponse } from '@/interfaces/scenario';

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
        text1
        images1 {
          results {
            id
            name
            description
            fileUrl
          }
        }
        text2
        images2 {
          results {
            id
            name
            description
            fileUrl
          }
        }
        scenarioSection {
          results {
          ... on ScenarioSection {
              id
              name
              text
              images {
                results {
                  id
                  name
                  description
                  fileUrl
                }
              }
            }
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
      text1
      images1 {
        results {
          id
          name
          description
          fileUrl
        }
      }
      text2
      images2 {
        results {
          id
          name
          description
          fileUrl
        }
      }
      scenarioSection {
        results {
        ... on ScenarioSection {
            id
            name
            text
            images {
              results {
                id
                name
                description
                fileUrl
              }
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
