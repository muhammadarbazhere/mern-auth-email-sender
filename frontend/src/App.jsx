import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import { useSelector } from "react-redux";

function App() {
  const isLoggedin = useSelector(state => state.isLoggedin);
  console.log(isLoggedin);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/welcome"
            element={isLoggedin ? <Welcome /> : null}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
