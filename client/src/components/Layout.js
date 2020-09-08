import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../utils/helpers";
import {FaHome,FaCartPlus} from "react-icons/fa"

const Layout = ({ children, match, history }) => {
    const isActive = (path) => {
      if (match.path === path) {
        return { color: "#000"};
      } else {
        return { color: "#fff" };
      }
    };


    const nav = () => (
      <div className="nav nav-tabs bg-primary">
        <Link to="/" className="nav-link">
         <div className="logo">GroceryBAG</div>
        </Link>
        <ul className="nav nav-tabs bg-primary">
          <li className="nav-item">
            <Link to="/" className="nav-link" style={isActive("/")}>
              <FaHome style={{margin:'3px'}}/>Home
            </Link>
          </li>
          {!isAuth() && (
            <>
              <li className="nav-item">
                <Link to="/signin" className="nav-link" style={isActive("/signin")}>
                  Signin
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link" style={isActive("/signup")}>
                  Signup
                </Link>
              </li>
            </>
          )}
    
          {isAuth() && (
            <>
              <li className="nav-item">
                <Link
                  to="/product-list"
                  className="nav-link"
                  style={isActive("/product-list")}
                >
                  Products
                </Link>
              </li>
    
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#fff" }}
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Signout
                </span>
              </li>
            </>
          )}
          {isAuth && (
           <li className="nav-item">
             <Link to="/cart" className="nav-link" style={isActive("/cart")}>
                Cart
               <FaCartPlus style={{margin:'3px'}}/>
            </Link>
          </li>
          )}
        </ul>
       </div> 
      );
    
      return (
        <Fragment>
          {nav()}
          <div className="container">{children}</div>
        </Fragment>
      );
    };
    
    export default withRouter(Layout);
