import { Route } from "react-router-dom";
import {
  BrowserRouter,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Addtodo from "../pages/Add_todo/Add_todo";
import NotFound from "../pages/NotFound/NotFound";
import ViewPage from "../pages/ViewPage/ViewPage";
import Login from "../pages/login/Login";
import MainPage from "../pages/mainPage/MainPage";
import HomePage from "../pages/mainPage/HomePage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/home" component={MainPage} exact></Route>
        <Route path="/add" exact>
          <Addtodo />
        </Route>
        <Route path="/login" component={Login} exact></Route>
        <Route path="/view/:id" component={ViewPage} exact></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
