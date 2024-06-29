import { useContext, useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { FaMap, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext";
import Address from "../../shared/Address/Address";
import SubTitle from "../../shared/SubTitle/SubTitle";
import Map from "../../shared/Map/Map";

import styles from "./Contacts.module.scss";
const cx = classNames.bind(styles);
function Contacts() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const inputRef = useRef();
  const token = sessionStorage.getItem("accessToken");
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setContact((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user || user === undefined || user === null) {
        return alert("You're not authenticated. Please sign in !!");
      }
      const res = await fetch(`${BASE_URL}/contact`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contact),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert("Contact successfully !!");
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user]);
  return (
    <section className={cx("contact-section")}>
      <Address address={location.pathname.slice(1)} />
      <div className={cx("contact-us")}>
        <SubTitle subtitle={"contact us"} />
        <p>
          We are always ready to help you. There are many ways to contact us.
          You may drop us a line, give us a call or send an email, choose what
          suits you most.
        </p>
      </div>
      <div className={cx("info-container")}>
        <div className={cx("info")}>
          <div className={cx("info-box")}>
            <div className={cx("top")}>
              <FaMap className={cx("icon")} />
              <span>address</span>
            </div>
            <p>
              The Company Name Inc. 9870 St Vincent Place, Glasgow, DC 45 Fr 45.
            </p>
          </div>
          <div className={cx("info-box")}>
            <div className={cx("top")}>
              <FaPhoneAlt className={cx("icon")} />
              <span>phone</span>
            </div>
            <p>+1 800 603 6035</p>
          </div>
          <div className={cx("info-box")}>
            <div className={cx("top")}>
              <MdOutlineMail className={cx("icon")} />
              <span>email</span>
            </div>
            <p>example@gmail.com</p>
          </div>
        </div>
        <div className={cx("form")}>
          <Map />
          <form onSubmit={handleSubmit}>
            <h1>Get in Touch</h1>
            <div className={cx("input-box")}>
              <input
                type="text"
                placeholder="Name"
                id="name"
                onChange={handleChange}
                ref={inputRef}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                ref={inputRef}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <textarea
                cols="40"
                rows="10"
                type="text"
                placeholder="Here goes your message"
                id="message"
                onChange={handleChange}
                ref={inputRef}
              ></textarea>
            </div>
            <button type="submit">send message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
