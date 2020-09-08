import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Home from "../components/Home";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Activate from "../components/Activate";
import Forgot from "../components/Forgot";
import Reset from "../components/Reset";
import Productlist from "../components/Productlist";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Cart from "../components/Cart"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/" exact component={Home} />
        <PublicRoute restricted path="/signup" exact component={Signup} />
        <PublicRoute restricted path="/signin" exact component={Signin} />
        <PublicRoute
          restricted
          path="/auth/activate/:token"
          exact
          component={Activate}
        />
        <PublicRoute
          restricted
          path="/auth/password/forgot"
          exact
          component={Forgot}
        />
        <PublicRoute
          restricted
          path="/auth/password/reset/:token"
          exact
          component={Reset}
        />
        <PrivateRoute path="/product-list" exact component={Productlist} />
        <PrivateRoute path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;