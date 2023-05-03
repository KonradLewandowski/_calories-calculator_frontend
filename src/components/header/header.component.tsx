import {} from "react-bootstrap";
import styles from "./header.module.scss";

const HeaderComponent = () => {
  return (
    <header
      className={`${styles.klHeader} p-4 d-inline-flex container-fluid bg-light`}
    >
      <img
        src="https://avatars-for-users.s3.eu-north-1.amazonaws.com/logo/MERN-logo.png"
        className={`${styles.klHeader__image} container-sm mx-auto`}
        alt="MERN logo"
      />
    </header>
  );
};

export default HeaderComponent;
