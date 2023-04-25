import React from "react";
import { Route, Routes } from "react-router-dom";
import HeaderComponent from "../header/header.component";
import NavigationComponent from "../navigation/navigation.component";
import SignInFormComponent from "../signin-form/signin-form.component";
import LogInFormComponent from "../login-form/login-form.component";
import FooterComponent from "../footer/footer.component";

import styles from "./homepage.module.scss";

const HomepageComponent = () => {
  return (
    <div>
      <HeaderComponent />
      <NavigationComponent />
      <Routes>
        <Route path="/login" element={<LogInFormComponent />} />
        <Route path="/signin" element={<SignInFormComponent />} />
      </Routes>
      <FooterComponent />
    </div>
  );
};

export default HomepageComponent;
