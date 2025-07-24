import {createContext} from 'react';
import { useSeen } from '../hooks/useSeen';

export const SeenContext = createContext();

export const SeenContextProvider = ({children}) => {
    const {seenList, setSeenList, refresh} = useSeen();

    return (
        <SeenContext.Provider value={{
            seenList, setSeenList, refresh
        }}>
            {children}
        </SeenContext.Provider>
    )
}