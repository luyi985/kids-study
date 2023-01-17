import { useContext, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { SuperContext, USER, useSetUser } from "./common/superContext";

export const UserSelector = () => {
  const { user, setUser } = useContext(SuperContext);
  const [currentUser, setCurrentUser] = useState(user?.name ?? USER.FOREST);
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
            setCurrentUser(e.target.innerHTML);
          }}
        >
          {name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};
