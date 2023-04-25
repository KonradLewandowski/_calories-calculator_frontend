import { UserProvider } from "./contexts/user.context";
import { ErrorProvider } from "./contexts/error.context";

import "./App.scss";
import HomepageComponent from "./components/homepage/homepage.component";

function App() {
  return (
    <>
      <ErrorProvider>
        <UserProvider>
          <HomepageComponent />
        </UserProvider>
      </ErrorProvider>
    </>
  );
}

export default App;
