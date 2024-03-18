'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';

type Page = 'home' | 'saved';

interface ISidebarContext {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}

const SidebarContext = createContext<ISidebarContext | undefined>(undefined);

export const SidebarContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('home');

  return <SidebarContext.Provider value={{ page, setPage }}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = (): ISidebarContext => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarContextProvider');
  }
  return context;
};
