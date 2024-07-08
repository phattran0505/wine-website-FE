import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classNames from "classnames/bind";

import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import { toast } from "react-toastify";
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
  const [showPass, setShowPass] = useState(false);
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    const id = toast.loading("Loading...", {
      autoClose: 5000,
      pauseOnHover: false,
    });
    try {
      if (user.email === "" || user.password === "") {
        return toast.update(id, {
          render: "All fields are requied",
          type: "warning",
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
      }
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
        return toast.update(id, {
          render: result.message,
          type: "warning",
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      if (result) {
        toast.update(id, {
          render: "Login success ",
          type: "success",
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
      }

      setUser(result);
      localStorage.setItem("accessToken", result.token);
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILED", payload: error.message });
      toast.update(id, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 1500,
        pauseOnHover: false,
      });
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
              type={showPass ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              id="password"
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
          <div className={cx("remember-forgot")}>
            <div className={cx("remember")}>
              <input type="checkbox"></input>
              <p>Remember me</p>
            </div>
            <div className={cx("forgot")}>
              <Link to="/recovery-email">Forgot password</Link>
            </div>
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
