import React, { createContext, useContext, ReactNode } from 'react';
import { MovieStore, MovieStoreType } from './movieStore';

const StoreContext = createContext<MovieStoreType | null>(null);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = MovieStore.create({ movies: [] });

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): MovieStoreType => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};
