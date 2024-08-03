import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
  toastifyError,
  toastifySuccess,
} from "../../shared/Toastify/Toastify";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import Address from "../../shared/Address/Address";

import styles from "./RecoveryEmail.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);
function RecoveryEmail() {
  const { email, setEmail, setExpiresAt } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navgiate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/otp/send`,
        JSON.stringify({ email }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true
        }
      );
      const result = res.data;
      if (result.data) {
        toastifySuccess(result.message);
        setLoading(false);
        setExpiresAt(result.data.expiresAt);
        navgiate("/otp");
      }
    } catch (error) {
      setLoading(false);
      toastifyError(error.response?.data?.message);
    }
  };
  return (
    <section className={cx("form-section")}>
      <Address address={"forgot"} />
      <div className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <h1>Forgot</h1>
          <div className={cx("input-box")}>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
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
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RecoveryEmail;
