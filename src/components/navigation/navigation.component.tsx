import { Nav, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/user.context";
import InfoContext from "../../contexts/info.context";
import ErrorModalComponent from ".././info-modal/info-modal.component";
import {
  fetchLoggedUser,
  fetchLogOut,
} from "../../services/fetch-data.service";

import styles from "./navigation.module.scss";

const NavigationComponent = () => {
  const { setModalShow, setInfoMessage, setLoading, loading } =
    useContext(InfoContext);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchLoggedUser();

        if (response?.hasOwnProperty("errorMessage") || null) {
          return;
        }

        setUserData(response);

        navigate("/");
      } catch (error) {
        setModalShow(true);
        setInfoMessage("An error occurred while logging in.");

        console.error("NavigationComponent ERROR: ", error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await fetchLogOut();

      setModalShow(true);
      setInfoMessage("User logged out.");
      setUserData(null);
    } catch (error) {
      setModalShow(true);
      setInfoMessage("An error occurred while logging out.");

      console.error("handleLogOut ERROR: ", error);
    }
    setLoading(false);
  };

  return (
    <nav className={`bg-secondary bg-gradient`}>
      <Nav className={`${styles.klNav} p-2 justify-content-end container `}>
        {loading && (
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <ErrorModalComponent />
        {userData ? (
          <Nav.Item
            className={`${styles.klNav__links} d-flex align-items-center gap-2 text-light`}
          >
            <Link to="/" onClick={handleLogOut}>
              Log out
            </Link>
            <Link to="/edit-data">
              <img
                src={userData?.avatar}
                alt={userData?.username}
                className={`${styles.klNav__avatar} rounded-circle`}
              />
            </Link>
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
