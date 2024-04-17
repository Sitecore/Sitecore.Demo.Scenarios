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

interface ISavedScenariosContext {
  isLoading: boolean;
  savedScenarios: Scenario[];
  updateSavedScenarios: () => void;
}

const SavedScenariosContext = createContext<ISavedScenariosContext | undefined>(undefined);

export const useSavedScenariosContext = (): ISavedScenariosContext => {
  const context = useContext(SavedScenariosContext);
  if (!context) {
    throw new Error('useSavedScenariosContext must be used within a SavedScenariosProvider');
  }
  return context;
};

interface SavedScenariosProviderProps {
  children: ReactNode;
  scenarios: Scenario[] | null;
}

export const SavedScenariosContextProvider = ({
  children,
  scenarios,
}: SavedScenariosProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedScenarios, setSavedScenarios] = useState<Scenario[]>([]);

  const updateSavedScenarios = useCallback(() => {
    setIsLoading(true);
    const savedScenarioIDs = localStorage.getItem(SAVED_SCENARIOS_KEY)?.split(',') ?? [];
    const filteredScenarios =
      scenarios?.filter((scenario) => savedScenarioIDs.includes(scenario.id)) ?? [];

    setSavedScenarios(filteredScenarios);
    setIsLoading(false);
  }, [scenarios]);

  useEffect(() => {
    updateSavedScenarios();
  }, [updateSavedScenarios]);

  return (
    <SavedScenariosContext.Provider value={{ isLoading, savedScenarios, updateSavedScenarios }}>
      {children}
    </SavedScenariosContext.Provider>
  );
};
