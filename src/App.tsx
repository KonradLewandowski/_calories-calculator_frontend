import { UserProvider } from "./contexts/user.context";
import { ErrorProvider } from "./contexts/error.context";

import HeaderComponent from "./components/header/header.component";
import NavigationComponent from "./components/navigation/navigation.component";
import FooterComponent from "./components/footer/footer.component";
import SignupFormComponent from "./components/signup-form/signup-form.component";
import LogInFormComponent from "./components/login-form/login-form.component";

import "./App.scss";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <ErrorProvider>
        <UserProvider>
          <HeaderComponent />
          <NavigationComponent />
          <main className="p-4">
            <Routes>
              <Route path="/signup" element={<SignupFormComponent />} />
              <Route path="/login" element={<LogInFormComponent />} />
            </Routes>
          </main>
          <FooterComponent />
        </UserProvider>
      </ErrorProvider>
    </>
  );
}

export default App;
