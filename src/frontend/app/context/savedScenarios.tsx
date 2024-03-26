'use client';

import { SAVED_SCENARIOS_KEY } from '@/constants/scenario';
import { Scenario } from '@/interfaces/scenario';
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';

// Create a context to hold the saved scenarios and the fetch function
interface SavedScenariosContextType {
  savedScenarios: Scenario[];
  fetchSavedScenarios: () => void;
}

const SavedScenariosContext = createContext<SavedScenariosContextType | undefined>(undefined);

// Custom hook to use the saved scenarios context
export const useSavedScenarios = (): SavedScenariosContextType => {
  const context = useContext(SavedScenariosContext);
  if (!context) {
    throw new Error('useSavedScenarios must be used within a SavedScenariosProvider');
  }
  return context;
};

// Provider component to manage saved scenarios state and provide the fetch function
interface SavedScenariosProviderProps {
  children: ReactNode;
  scenarios: Scenario[] | null;
}

export const SavedScenariosProvider = ({ children, scenarios }: SavedScenariosProviderProps) => {
  const [savedScenarios, setSavedScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    fetchSavedScenarios();
  }, []);

  // Function to fetch saved scenarios
  const fetchSavedScenarios = useCallback(() => {
    const savedScenarioIDs = localStorage.getItem(SAVED_SCENARIOS_KEY)?.split(',') ?? [];
    const filteredScenarios =
      scenarios?.filter((scenario) => savedScenarioIDs.includes(scenario.id)) ?? [];

    setSavedScenarios(filteredScenarios);
  }, []);

  return (
    <SavedScenariosContext.Provider value={{ savedScenarios, fetchSavedScenarios }}>
      {children}
    </SavedScenariosContext.Provider>
  );
};
