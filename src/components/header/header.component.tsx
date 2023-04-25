import { useContext } from "react";
import UserContext from "../../contexts/user.context";
import styles from "./header.module.scss";

const HeaderComponent = () => {
  const { userData } = useContext(UserContext);

  return (
    <header>
      <img src={userData?.avatar} alt={userData?.username} />
    </header>
  );
};

export default HeaderComponent;
