import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { initSuperDb } from "@/core/superDb";
import { SupabaseClient } from "@supabase/supabase-js";
const superBase = initSuperDb();

export enum USER {
  FOREST = "Forest",
  LYNDON = "Lyndon",
  DADDY = "Daddy",
}
type USER_DETAILS = { name: USER; id: number };
type SuperContextValue = {
  superBase: SupabaseClient<any, "public", any> | undefined;
  setUser: (u: USER_DETAILS) => void;
  user?: USER_DETAILS;
};

export const SuperContext = createContext<SuperContextValue>(
  {} as SuperContextValue
);

export const SuperProvider: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  const [user, setUser] = useState<USER_DETAILS | undefined>();
  const superContextValue: SuperContextValue = {
    superBase,
    setUser,
    user,
  };
  return (
    <SuperContext.Provider value={superContextValue}>
      {children}
    </SuperContext.Provider>
  );
};

export const useSetUser = (userName?: USER) => {
  const { user, superBase, setUser } = useContext(SuperContext);
  useEffect(() => {
    if (!superBase) return;
    if (user?.name === userName || !userName) return;
    superBase
      .from("users")
      .select()
      .in("name", [userName])
      .then((userDetails) => {
        if (!Array.isArray(userDetails.data) || !userDetails.data.length) {
          console.error(`Could not find user ${userName}`);
        }
        setUser({
          name: userDetails.data?.[0]?.name,
          id: userDetails.data?.[0]?.id,
        });
      });
  }, [setUser, superBase, user?.name, userName]);
};
