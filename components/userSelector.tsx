import { useContext, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { getItemFromStorage, setItemToStorage } from "./common/storage";
import { SuperContext, USER, useSetUser } from "./common/superContext";

export const UserSelector = () => {
  const { user } = useContext(SuperContext);
  const [currentUser, setCurrentUser] = useState(
    user?.name ?? getItemFromStorage<USER>("currentUser") ?? undefined
  );
  useSetUser(currentUser);
  return (
    <DropdownButton title={user?.name ?? "No User"}>
      {Object.values(USER).map((name) => (
        <Dropdown.Item
          key={name}
          active={name === currentUser}
          onClick={(e) => {
            e.preventDefault();
            // @ts-ignore
            const userName = e.target.innerHTML;
            setItemToStorage("currentUser", userName);
            setCurrentUser(userName);
          }}
        >
          {name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};
