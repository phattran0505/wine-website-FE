import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import Address from "../../shared/Address/Address";

import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
function Login() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      if (result) {
        alert("Login Success !!");
      }
      setUser(result);
      sessionStorage.setItem("accessToken", result.token);
      navigate(-1)
    } catch (error) {
      dispatch({ type: "LOGIN_FAILED", payload: error.message });
      alert(error.message);
    }
  };
  return (
    <section className={cx("form-section")}>
      <Address address={"login"} />
      <div className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className={cx("input-box")}>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              id="email"
            ></input>
          </div>
          <div className={cx("input-box")}>
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              id="password"
            ></input>
          </div>
          <div className={cx("input-box")}>
            <button type="submit">Login</button>
          </div>
          <p>
            Don't have an account? <Link to="/register">register</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
