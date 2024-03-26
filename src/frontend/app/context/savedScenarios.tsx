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

interface SavedScenariosContextType {
  isLoading: boolean;
  savedScenarios: Scenario[];
  updateSavedScenarios: () => void;
}

const SavedScenariosContext = createContext<SavedScenariosContextType | undefined>(undefined);

export const useSavedScenarios = (): SavedScenariosContextType => {
  const context = useContext(SavedScenariosContext);
  if (!context) {
    throw new Error('useSavedScenarios must be used within a SavedScenariosProvider');
  }
  return context;
};

interface SavedScenariosProviderProps {
  children: ReactNode;
  scenarios: Scenario[] | null;
}

export const SavedScenariosProvider = ({ children, scenarios }: SavedScenariosProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedScenarios, setSavedScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    updateSavedScenarios();
  }, []);

  const updateSavedScenarios = useCallback(() => {
    setIsLoading(true);
    const savedScenarioIDs = localStorage.getItem(SAVED_SCENARIOS_KEY)?.split(',') ?? [];
    const filteredScenarios =
      scenarios?.filter((scenario) => savedScenarioIDs.includes(scenario.id)) ?? [];

    setSavedScenarios(filteredScenarios);
    setIsLoading(false);
  }, []);

  return (
    <SavedScenariosContext.Provider value={{ isLoading, savedScenarios, updateSavedScenarios }}>
      {children}
    </SavedScenariosContext.Provider>
  );
};
