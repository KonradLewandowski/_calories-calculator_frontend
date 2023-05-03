import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/user.context";
import ErrorContext from "../../contexts/error.context";
import ErrorModalComponent from "../error-modal/error-modal.component";
import {
  fetchLoggedUser,
  fetchLogOut,
} from "../../services/fetch-data.service";

import styles from "./navigation.module.scss";

const NavigationComponent = () => {
  const { setModalShow, setErrorMessage } = useContext(ErrorContext);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchLoggedUser();
        console.log("User useEffect: ", response);

        if (response?.hasOwnProperty("error") || null) {
          return;
        }

        setUserData(response);
      } catch (error) {
        setModalShow(true);
        setErrorMessage("An error occurred while logging in.");
        console.error(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const onLogOut = async () => {
    try {
      await fetchLogOut();

      setUserData(null);
    } catch (error) {
      setModalShow(true);
      setErrorMessage("An error occurred while logging out.");
      console.error(error);
    }
  };
  return (
    <nav className={`bg-secondary bg-gradient`}>
      <Nav className={`${styles.klNav} p-2 justify-content-end container `}>
        <ErrorModalComponent />
        {userData ? (
          <Nav.Item
            className={`${styles.klNav__links} d-flex align-items-center gap-2 text-light`}
          >
            <Link to="/" onClick={onLogOut}>
              Log out
            </Link>
            <img
              src={userData?.avatar}
              alt={userData?.username}
              className={`${styles.klNav__avatar} rounded-circle`}
            />
          </Nav.Item>
        ) : (
          <Nav.Item
            className={`${styles.klNav__links} d-flex align-items-center gap-2 text-light`}
          >
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </Nav.Item>
        )}
      </Nav>
    </nav>
  );
};

export default NavigationComponent;
