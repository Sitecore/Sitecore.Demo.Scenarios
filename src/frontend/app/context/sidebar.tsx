'use client';

import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react';

type Page = 'home' | 'saved';
type ScrollPos = {
  home: number | undefined;
  saved: number | undefined;
};

interface ISidebarContext {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  scrollPos: ScrollPos;
  setScrollPos: React.Dispatch<React.SetStateAction<ScrollPos>>;
  resetScrollPos: () => void;
}

const SidebarContext = createContext<ISidebarContext | undefined>(undefined);

export const SidebarContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('home');
  const [scrollPos, setScrollPos] = useState<ScrollPos>({ home: undefined, saved: undefined });

  const resetScrollPos = useCallback(() => {
    setScrollPos({ home: undefined, saved: undefined });
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        page,
        setPage,
        scrollPos,
        setScrollPos,
        resetScrollPos,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = (): ISidebarContext => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarContextProvider');
  }
  return context;
};
