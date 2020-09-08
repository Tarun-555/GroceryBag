import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Layout from "./Layout";


const Signup = () => {
    const [formInputs, setFormInputs] = useState({
      name: "",
      email: "",
      password: "",
      buttonText: "Submit",
    });

 const { buttonText, name, email, password } = formInputs;

 const handleChange = (evt) => {
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    // Avoid page refresh
    evt.preventDefault();
    setFormInputs({ ...formInputs, buttonText: "Submitting..." });

    axios
      .post("/signup", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log("SIGNED UP SUCCESS!!", res);
        
        setFormInputs({
            name: "",
            password: "",
            email: "",
            buttonText: "Submit",
          });

          toast.success(res.data.message);
        })
        .catch((err) => {
          if (err && err.response && err.response.data) {
            toast.error(err.response.data.error);
          }
  
          setFormInputs({
            ...formInputs,
            buttonText: "Submit",
          });
        });
    };

    const signupForm = () => (
        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange}
              name="name"
              value={name}
              type="text"
              className="form-control"
            />
          </div>
    
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              value={email}
              className="form-control"
            />
          </div>
    
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              value={password}
              className="form-control"
            />
          </div>
    
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {buttonText}
            </button>
          </div>
        </form>
      );
    
      return (
        <Layout>
          <div className="col-md-6 offset-md-3">
            <ToastContainer />
            <h1 className="p-5 text-center">Sign up</h1>
    
            {signupForm()}
          </div>
        </Layout>
      );
    };
    
    export default Signup;
