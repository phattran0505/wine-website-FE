import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classNames from "classnames/bind";

import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import { toastifyError } from "../../shared/Toastify/Toastify";

import Address from "../../shared/Address/Address";

import styles from "./Register.module.scss";
const cx = classNames.bind(styles);
function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
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
    const id = toast.loading("Loading...", { autoClose: 5000 });
    try {
      if (
        user.username === "" ||
        user.email === "" ||
        user.password === "" ||
        user.phone === "" ||
        user.age === ""
      ) {
        return toast.update(id, {
          render: "All fields are required",
          type: "warning",
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
      }
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) {
        return toast.update(id, {
          render: result.message,
          type: "warning",
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
      }
      if (result.data) {
        toast.update(id, {
          render: result.message,
          type: "success",
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
      }
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (error) {
      return toastifyError(error.message);
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
              required
            ></input>
          </div>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email"
              id="email"
              required
            ></input>
          </div>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              id="password"
              required
            ></input>
            {showPass ? (
              <FaEye
                className={cx("icon-eye")}
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <FaEyeSlash
                className={cx("icon-eye")}
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Phone"
              id="phone"
              required
            ></input>
            <input
              onChange={handleChange}
              type="number"
              placeholder="Age"
              id="age"
              min={0}
              required
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
