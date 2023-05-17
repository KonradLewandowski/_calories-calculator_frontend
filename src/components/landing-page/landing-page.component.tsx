import { useContext } from "react";
import userContext from "../../contexts/user.context";

import HelloPageComponent from "../hello-page/hello-page.component";
import UserPageComponent from "../user-page/user-page.component";

import styles from "./landing-page.module.scss";

const LandingPageComponent = () => {
  const { userData } = useContext(userContext);
  return (
    <section className={`${styles.klSection} mx-auto`}>
      {!userData ? <HelloPageComponent /> : <UserPageComponent />}
    </section>
  );
};

export default LandingPageComponent;
