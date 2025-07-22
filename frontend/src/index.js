import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataContextProvider } from './context/DataContext';
import { WatchlistContextProvider, WatchlistProviderContext } from './context/WatchlistContext';
import { DiscoverContextProvider } from './context/DiscoverContext';
import { SeenContextProvider } from './context/SeenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataContextProvider>
      <WatchlistContextProvider>
        <DiscoverContextProvider>
          <SeenContextProvider>
            <App />
          </SeenContextProvider>
        </DiscoverContextProvider>
      </WatchlistContextProvider>
    </DataContextProvider>
  </React.StrictMode>
);