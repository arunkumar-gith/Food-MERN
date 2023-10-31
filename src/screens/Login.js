import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://food-back-dv44.onrender.com/api/loginuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    // if (!json.success) {
    //   alert("Enter Valid Credentials");
    // }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    } else {
      alert("Enter valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <div>
          <Navbar />
        </div>
        <div className="container">
          <form
            className="w-50 m-auto mt-5 border bg-dark border-success rounded"
            onSubmit={handleSubmit}
          >
            <div className="m-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onChange}
                aria-describedby="emailHelp"
                placeholder="Enter Email"
              />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={credentials.password}
                onChange={onChange}
                name="password"
                placeholder="Enter Password"
              />
            </div>
            <button type="submit" className="m-3 btn btn-success">
              Log In
            </button>
            <Link to="/createuser" className="m-3 mx-1 btn btn-danger">
              New User
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
