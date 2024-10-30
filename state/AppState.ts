import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface AppStateContext {
  stockOptions?: { label: string, value: string }[]
  timeKey?: string
  setTimeKey?: Dispatch<SetStateAction<string>>
}

export const AppStateContext = createContext<AppStateContext>({
  stockOptions: [],
});

export const useAppState = () => useContext(AppStateContext);
