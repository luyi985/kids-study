import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type StaticCxt = Record<string, any>;

export const StaticContext = createContext<StaticCxt>({});

export const StaticProvider: React.FC<{
  children: ReactNode | ReactNode[];
  value: StaticCxt;
}> = ({ value, children }) => {
  return (
    <StaticContext.Provider value={value}>{children}</StaticContext.Provider>
  );
};
