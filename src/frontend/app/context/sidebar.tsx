'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';

type Page = 'home' | 'saved';
type ScrollPos = {
  home: number;
  saved: number;
};

interface ISidebarContext {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  scrollPos: ScrollPos;
  setScrollPos: React.Dispatch<React.SetStateAction<ScrollPos>>;
}

const SidebarContext = createContext<ISidebarContext | undefined>(undefined);

export const SidebarContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('home');
  const [scrollPos, setScrollPos] = useState<ScrollPos>({ home: 0, saved: 0 });

  return (
    <SidebarContext.Provider
      value={{
        page,
        setPage,
        scrollPos,
        setScrollPos,
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
