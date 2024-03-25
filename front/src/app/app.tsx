'use client';
import React from 'react';
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

const App = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <main
              className={
                'flex flex-col w-full min-h-[100vh] bg-black border-[5px] border-solid border-matrix'
              }
            >
              <Header />
              {children}
            </main>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
