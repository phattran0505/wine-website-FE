import { useContext, useEffect, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import { toast } from "react-toastify";
import classNames from "classnames/bind";

import Address from "../../shared/Address/Address";

import styles from "./OTPInput.module.scss";
const cx = classNames.bind(styles);
function OTPInput() {
  const { email, expiresAt } = useContext(AuthContext);
  const input1Ref = useRef();
  const navigate = useNavigate()
  const timer = Math.floor((new Date(expiresAt).getTime() - new Date().getTime()) / 1000)
  const [time, setTime] = useState(timer);
  const [toggle, setToggle] = useState(false);
  const [values, setValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const otp = Number(Object.values(values).join(""));
  useEffect(() => {
    if (time === 0) {
      setToggle(true);
      return;
    }
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Loading...", { pauseOnHover: false });
    try {
      const res = await fetch(`${BASE_URL}/otp/check`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ otp, email }),
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
      toast.update(id, {
        type: "success",
        render: result.message,
        isLoading: false,
        autoClose: 1500,
        pauseOnHover: false,
      });
      navigate("/change")
    } catch (error) {
      return toast.update(id, {
        type: "success",
        render: error.message,
        isLoading: false,
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };
  const resendOTP = async () => {
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
        setToggle(false);
        setTime(60);
        setValues({
          input1: "",
          input2: "",
          input3: "",
          input4: "",
        });
        input1Ref.current.focus();
      }
    } catch (error) {
      return toast.update(id, {
        type: "success",
        render: error.message,
        isLoading: false,
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };
  return (
    <section className={cx("form-section")}>
      <Address address={"otp input"} />
      <div className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <h1>Email Verification</h1>
          <p>We have sent a code to {email}</p>
          <div className={cx("input-otp")}>
            <div className={cx("input-box")}>
              <input
                name="input1"
                value={values.input1}
                type="number"
                onChange={handleChange}
                ref={input1Ref}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <input
                name="input2"
                value={values.input2}
                type="number"
                onChange={handleChange}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <input
                name="input3"
                value={values.input3}
                type="number"
                onChange={handleChange}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <input
                name="input4"
                value={values.input4}
                type="number"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className={cx("button")}>
            <button type="submit">Verify Account</button>
          </div>
          <div className={cx("timer")}>
            {toggle ? (
              <p>
                Didn't have code? <span onClick={resendOTP}>Resend</span>
              </p>
            ) : (
              <p>
                Code will expire in{" "}
                <span style={{ textDecoration: "none" }}>{time}s</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default OTPInput;
