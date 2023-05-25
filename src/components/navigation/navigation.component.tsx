import { Nav, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { SiMongodb, SiReact, SiExpress, SiNodedotjs } from "react-icons/si";
import UserContext from "../../contexts/user.context";
import InfoContext from "../../contexts/info.context";
import {
  fetchLoggedUser,
  fetchLogOut,
} from "../../services/fetch-data.service";
import InfoModalComponent from "../info-modal/info-modal.component";

import styles from "./navigation.module.scss";

const NavigationComponent = () => {
  const { setModalShow, setInfoState, setLoading, loading } =
    useContext(InfoContext);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { body } = await fetchLoggedUser();

        setUserData(body);
      } catch (error) {
        setInfoState({ infoMessage: "An error occurred!" });
        setModalShow(true);

        console.error("NavigationComponent ERROR: ", error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleLogOut = async () => {
    try {
      setLoading(true);

      const response = await fetchLogOut();

      setInfoState(response);
      setUserData(null);

      navigate("/");
    } catch (error) {
      setInfoState({ infoMessage: "An error occurred while logging out." });

      console.error("handleLogOut ERROR: ", error);
    } finally {
      setLoading(false);
      setModalShow(true);
    }
  };

  return (
    <>
      {loading && (
        <div
          className={`d-flex flex-wrap justify-content-center align-items-center position-absolute w-100 h-100`}
        >
          <Spinner className="spinner-grow" animation="border" role="status" />
        </div>
      )}

      <nav className={`bg-secondary px-3 py-4 fixed-top w-100`}>
        <Nav
          className={`${styles.klNav} justify-content-between container mx-auto gap-2 p-0 `}
        >
          <Nav.Item
            className={`${styles.klNav__links} ${styles.klNav__mern} d-flex align-items-center gap-2 text-light `}
          >
            <SiMongodb />
            <SiExpress />
            <SiReact className={`${styles.klNav__react}`} />
            <SiNodedotjs />
          </Nav.Item>

          <Nav.Item
            className={` d-flex align-items-center justify-content-center gap-2 text-light  flex-column`}
          >
            <Link to="/">
              <AiOutlineHome className={`${styles.klNav__home}`} size={32} />
            </Link>

            {userData &&
              `Hi ${
                userData.username.charAt(0).toUpperCase() +
                userData.username.slice(1)
              }`}
          </Nav.Item>

          {userData ? (
            <Nav.Item
              className={`d-flex align-items-center  gap-2 text-light `}
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
      <InfoModalComponent />
    </>
  );
};

export default NavigationComponent;
