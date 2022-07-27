import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signin } from "../../component/Redux/reducers/auth";

////import for styling //

import "./style.css";

export const SigninPage = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  /////////////////////////login function//

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (res) {
        setMessage("");

        dispatch(signin(res.data.token));
        navigate("/");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  useEffect(() => {
    {
    }
    if (isLoggedIn) {
      console.log(isLoggedIn);
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="signin-page">
        <form className="container">
          <div className="input-position">
            <div className="form-group">
              <h5 className="input-placeholder">Email</h5>
              <input
                type="email"
                required={true}
                name="email"
                className="form-style"
                autoComplete={"off"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <h5 className="input-placeholder">Password</h5>
              <input
                type="password"
                required={true}
                name="logpass"
                className="form-style"
                autoComplete={"on"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <span className="error-message">{message}</span>
          </div>
          <div className="password-container">
            <Link to={"/signup"} className="link">
              Need to create a new account?
            </Link>
          </div>
          <div className="btn-position">
            <button className="btn" onClick={signIn}>
              Signin
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
