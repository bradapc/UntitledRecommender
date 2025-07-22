import {createContext} from 'react';
import {useState, useEffect, useContext} from 'react';
import { useSeen } from '../hooks/useSeen';

export const SeenContext = createContext();

export const SeenContextProvider = ({children}) => {
    const {seenList, setSeenList} = useSeen();

    return (
        <SeenContext.Provider value={{
            seenList, setSeenList
        }}>
            {children}
        </SeenContext.Provider>
    )
}