import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classNames from "classnames/bind";
import ClipLoader from "react-spinners/ClipLoader";

import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import {
  toastifyError,
  toastifySuccess,
  toastifyWarn,
} from "../../shared/Toastify/Toastify";
import Address from "../../shared/Address/Address";

import styles from "./ChangePassword.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);
function ChangePassword() {
  const { email } = useContext(AuthContext);
  const navgiate = useNavigate();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (confirmPass === "" || newPass === "" || !isChecked) {
      return toastifyWarn("All fields are required");
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/reset`,
        JSON.stringify({ email, newPass, confirmPass }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.data) {
        setLoading(false);
        toastifySuccess(result.message);
        navgiate("/login");
      }
    } catch (error) {
      return toastifyError(error.response?.data?.message);
    }
  };
  const toggleNewPass = () => {
    setShowNewPass(!showNewPass);
  };
  const toggleConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };
  return (
    <section className={cx("form-section")}>
      <Address address={"chang password"} />
      <div className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <h1>Change Password</h1>
          <div className={cx("input-box")}>
            <input
              type={showNewPass ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => setNewPass(e.target.value)}
            ></input>
            {showNewPass ? (
              <FaEye className={cx("icon-eye")} onClick={toggleNewPass} />
            ) : (
              <FaEyeSlash className={cx("icon-eye")} onClick={toggleNewPass} />
            )}
          </div>
          <div className={cx("input-box")}>
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
            ></input>

            {showConfirmPass ? (
              <FaEye className={cx("icon-eye")} onClick={toggleConfirmPass} />
            ) : (
              <FaEyeSlash
                className={cx("icon-eye")}
                onClick={toggleConfirmPass}
              />
            )}
          </div>
          <div className={cx("remember-forgot")}>
            <div className={cx("remember")}>
              <input
                type="checkbox"
                required
                value={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              ></input>
              <p>
                I accept the <span>Term and Conditions</span>
              </p>
            </div>
          </div>
          <div className={cx("input-box")}>
            <button type="submit">
              {loading ? (
                <ClipLoader
                  color="var(--dark-color)"
                  cssOverride={{}}
                  loading
                  size={13}
                  speedMultiplier={1}
                />
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
