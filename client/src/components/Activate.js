import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";

const Activate = ({ match }) => {
    const [values, setValues] = useState({
      name: "",
      token: "",
      show: true,
    });

    useEffect(() => {
        let token = match.params.token;
        // console.log(token);
        if (token) {
          let { name } = jwt.decode(token);
          setValues((v) => ({ ...v, name, token }));
        }
      }, [match.params.token]);

      const { name, token } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/account-activation", { token })
      .then((response) => {
        console.log("ACCOUNT ACTIVATION", response);
        setValues({ ...values, show: false });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("ACCOUNT ACTIVATION ERROR", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;