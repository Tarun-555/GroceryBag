import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BTN_LABEL = "Request password reset link";

const Forgot = ({ history }) => {
    const [values, setValues] = useState({
      email: "",
      buttonText: BTN_LABEL,
    });


    const { email, buttonText } = values;
    
    const handleChange = (name) => (event) => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
      };

      const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: "Submitting" });
        axios
          .post("forgot-password", { email })
          .then((response) => {
            console.log("FORGOT PASSWORD SUCCESS", response);
            toast.success(response.data.message);
            setValues({ ...values, buttonText: BTN_LABEL });
          })
          .catch((error) => {
            console.log("FORGOT PASSWORD ERROR", error.response.data);
            toast.error(error.response.data.error);
            setValues({ ...values, buttonText: BTN_LABEL });
          });
      }; 

      const passwordForgotForm = () => (
        <form>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={handleChange("email")}
              value={email}
              type="email"
              className="form-control"
            />
          </div>
    
          <div>
            <button className="btn btn-primary" onClick={clickSubmit}>
              {buttonText}
            </button>
          </div>
        </form>
      );
    
      return (
        <Layout>
          <div className="col-md-6 offset-md-3">
            <ToastContainer />
            <h1 className="p-5 text-center">Forgot password</h1>
            {passwordForgotForm()}
          </div>
        </Layout>
      );
    };
    
    export default Forgot;