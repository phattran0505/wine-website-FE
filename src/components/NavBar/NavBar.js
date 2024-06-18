import { useContext } from "react";
import classNames from "classnames/bind";

import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MenuContext } from "../../contexts/MenuContext";
import { CartContext } from "../../contexts/CartContext";
import logoImg from "../../assets/images/logo.webp";
import userImg from "../../assets/images/user.png";

import styles from "./NavBar.module.scss";
const cx = classNames.bind(styles);
function NavBar() {
  const { setOpenCart, openCart, amount } = useContext(CartContext);
  const { setOpenMenu } = useContext(MenuContext);
  const { user, dispatch } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    sessionStorage.removeItem("accessToken");
    alert("Account is logout !!!");
  };
  return (
    <nav>
      <div className={cx("top")}>
        <div className={cx("info")}>
          <i>
            <FiPhone />
          </i>
          <Link to="#">+3(800)2345-6789</Link>
          <p>7 Days a week from 9:00 am to 7:00 pm</p>
        </div>
        <div className={cx("options")}>
          <ul>
            <li>
              {user ? (
                <Link to={"#"} onClick={logout}>
                  <CiLogout style={{ fontSize: "18px" }} />
                  Logout
                </Link>
              ) : (
                <Link to={"/login"}>
                  <CiLogin style={{ fontSize: "18px" }} />
                  Login
                </Link>
              )}
            </li>
            <li>Compare</li>
            <li>My account</li>
            <li>
              <Link to="/wish-list">Wishlist</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx("bottom")}>
        <div className={cx("bottom-content")}>
          <div className={cx("menu")}>
            <LuMenu onClick={() => setOpenMenu(true)} />
          </div>
          <Link to="/">
            <img src={logoImg} alt=""></img>
          </Link>
          <div className={cx("icons")}>
            <i className={cx("search-icon")}>
              <IoSearchSharp />
            </i>
            <i
              className={cx("shopping-icon")}
              onClick={() => setOpenCart(!openCart)}
            >
              <FaShoppingCart />
              <span>{amount}</span>
            </i>
            <div className={cx("avatar", user ? "active" : "")}>
              <img src={userImg} alt="" className={cx("user-image")}></img>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
