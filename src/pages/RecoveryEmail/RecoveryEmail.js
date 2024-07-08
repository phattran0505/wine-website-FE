import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { toast } from "react-toastify";
import Address from "../../shared/Address/Address";

import styles from "./RecoveryEmail.module.scss";
const cx = classNames.bind(styles);
function RecoveryEmail() {
  const { email, setEmail, setExpiresAt } = useContext(AuthContext);
  const navgiate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Loading...", { pauseOnHover: false });
    try {
      const res = await fetch(`${BASE_URL}/otp/send`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (!res.ok) {
        return toast.update(id, {
          type: "error",
          render: result.message,
          autoClose: 1500,
          isLoading: false,
          pauseOnHover: false,
        });
      }
      if (result.data) {
        toast.update(id, {
          type: "success",
          render: result.message,
          autoClose: 1500,
          isLoading: false,
          pauseOnHover: false,
        });
        setExpiresAt(result.data.expiresAt);
        navgiate("/otp");
      }
    } catch (error) {
      return toast.update(id, {
        type: "error",
        render: error.message,
        autoClose: 1500,
        isLoading: false,
        pauseOnHover: false,
      });
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
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RecoveryEmail;
