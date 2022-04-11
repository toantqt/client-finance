import { Route, Redirect, BrowserRouter, HashRouter } from "react-router-dom";
import { isLoggedIn, checkRole } from "./auth/auth";
import Dashboard from "./screens/Admin/Dashboard/screens/Dashboard";
import Home from "./screens/Home/Home";
import LoginPage from "./screens/Login/screens/LoginPage";
import "./assets/style/style.css";

function App() {
  return (
    <HashRouter>
      <Route
        path="/admin"
        render={() =>
          checkRole("admin") ? <Dashboard /> : <Redirect to="/auth/login" />
        }
      ></Route>
      <Route exact path="/auth/login" component={LoginPage}></Route>
      <Route exact path="/home" component={Home}></Route>
    </HashRouter>
  );
}

export default App;
