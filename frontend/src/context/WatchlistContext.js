import {createContext} from 'react';
import {useState, useEffect} from 'react';
import useWatchlist from '../hooks/useWatchlist';

export const WatchlistContext = createContext();

export const WatchlistContextProvider = ({children}) => {
    const {watchlist, isLoading, error} = useWatchlist();

    return (
        <WatchlistContext.Provider value={{
            watchlist, isLoading, error
        }}>
            {children}
        </WatchlistContext.Provider>
    )
}