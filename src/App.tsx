import { UserProvider } from "./contexts/user.context";
import { ErrorProvider } from "./contexts/error.context";

import LandingPageComponent from "./components/landing-page/landing-page.component";
import NavigationComponent from "./components/navigation/navigation.component";
import FooterComponent from "./components/footer/footer.component";
import SignupFormComponent from "./components/signup-form/signup-form.component";
import ConfirmEmailComponent from "./components/confirm-email/confirm-email.component";
import LogInFormComponent from "./components/login-form/login-form.component";
import ResetPageComponent from "./components/reset-page/reset-page.component";

import "./App.scss";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <ErrorProvider>
        <UserProvider>
          <NavigationComponent />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<LandingPageComponent />} />
              <Route path="/signup" element={<SignupFormComponent />} />
              <Route
                path="/confirm-email"
                element={<ConfirmEmailComponent />}
              />
              <Route path="/login" element={<LogInFormComponent />} />
              <Route path="/reset-page" element={<ResetPageComponent />} />
            </Routes>
          </main>
          <FooterComponent />
        </UserProvider>
      </ErrorProvider>
    </>
  );
}

export default App;
