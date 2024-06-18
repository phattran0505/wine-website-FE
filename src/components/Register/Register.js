import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import Address from "../../shared/Address/Address";

import styles from "./Register.module.scss";
const cx = classNames.bind(styles);
function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: 0,
    age: 0,
  });
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      console.log(result);
      if (!res.ok) {
        return alert(result.message);
      }
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (error) {
      alert("Error Server !!!!!");
    }
  };

  return (
    <section className={cx("form-section")}>
      <Address address={location.pathname.slice(1)} />
      <div className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <h1>register</h1>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="UserName"
              id="username"
            ></input>
          </div>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email"
              id="email"
            ></input>
          </div>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type="password"
              placeholder="Password"
              id="password"
            ></input>
          </div>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Phone"
              id="phone"
            ></input>
            <input
              onChange={handleChange}
              type="number"
              placeholder="Age"
              id="age"
            ></input>
          </div>
          <div className={cx("input-box")}>
            <button type="submit">Register</button>
          </div>
          <p>
            Already have an account? <Link to="/login">login</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
