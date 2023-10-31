import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://food-back-dv44.onrender.com/api/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.location,
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    if (json.success) {
      navigate("/loginuser");
    }
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className="container ">
        <form
          onSubmit={handleSubmit}
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="emailid">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              id="emailid"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Address"
              name="location"
              value={credentials.location}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/loginuser" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
