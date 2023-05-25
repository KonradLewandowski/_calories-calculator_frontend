import { Route, Routes } from "react-router-dom";
import EditDataPageComponent from "./components/edit-data-page/edit-data-page.component";

import { UserProvider } from "./contexts/user.context";
import { ErrorProvider } from "./contexts/info.context";

import LandingPageComponent from "./components/landing-page/landing-page.component";
import NavigationComponent from "./components/navigation/navigation.component";
import FooterComponent from "./components/footer/footer.component";
import SignupFormComponent from "./components/signup-form/signup-form.component";
import ConfirmEmailComponent from "./components/confirm-email/confirm-email.component";
import LogInFormComponent from "./components/login-form/login-form.component";
import ResetPageComponent from "./components/reset-page/reset-page.component";
import ResetPasswordPageComponent from "./components/reset-password-page/reset-password-page.component";
import NotFoundPageComponent from "./components/not-found-page/not-found-page.component";

import "./App.scss";

function App() {
  return (
    <>
      <ErrorProvider>
        <UserProvider>
          <NavigationComponent />
          <main className="py-4 min-vh-100 d-flex">
            <Routes>
              <Route path="/" element={<LandingPageComponent />} />
              <Route path="/signup" element={<SignupFormComponent />} />
              <Route
                path="/confirm-email"
                element={<ConfirmEmailComponent />}
              />
              <Route path="/login" element={<LogInFormComponent />} />
              <Route path="/reset-page" element={<ResetPageComponent />} />
              <Route
                path="/reset-password"
                element={<ResetPasswordPageComponent />}
              />
              <Route path="/edit-data" element={<EditDataPageComponent />} />
              <Route path="/*" element={<NotFoundPageComponent />} />
            </Routes>
          </main>
          <FooterComponent />
        </UserProvider>
      </ErrorProvider>
    </>
  );
}

export default App;
