import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classNames from "classnames/bind";

import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import Address from "../../shared/Address/Address";

import styles from "./ChangePassword.module.scss";
const cx = classNames.bind(styles);
function ChangePassword() {
  const { email } = useContext(AuthContext);
  const navgiate = useNavigate();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Loading...", { pauseOnHover: false });
    if (confirmPass === "" || newPass === "" || !isChecked) {
      return toast.update(id, {
        type: "warning",
        render: "All fields are required",
        autoClose: 1500,
        isLoading: false,
        pauseOnHover: false,
      });
    }
    try {
      const res = await fetch(`${BASE_URL}/auth/reset`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, newPass, confirmPass }),
      });
      const result = await res.json();
      if (!res.ok) {
        return toast.update(id, {
          type: "error",
          render: result.message,
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
      }
      if (result.data) {
        toast.update(id, {
          type: "success",
          render: result.message,
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
        navgiate("/login");
      }
    } catch (error) {
      return toast.update(id, {
        type: "error",
        render: error.message,
        isLoading: false,
        autoClose: 1500,
        pauseOnHover: false,
      });
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
                value={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              ></input>
              <p>
                I accept the <span>Term and Conditions</span>
              </p>
            </div>
          </div>
          <div className={cx("input-box")}>
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
