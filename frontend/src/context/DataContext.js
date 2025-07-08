import {createContext} from 'react';
import {useState} from 'react';

export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
    const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API_URL || '');

    return (
        <DataContext.Provider value={{
            apiUrl, setApiUrl
        }}>
            {children}
        </DataContext.Provider>
    )
};