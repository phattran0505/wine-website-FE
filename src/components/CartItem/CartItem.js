import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";

import styles from "./CartItem.module.scss";
import { useContext } from "react";
const cx = classNames.bind(styles);
function CartItem({ item }) {
  const words = item.name.split(" ")
  const name = words.slice(0,4).join(" ")
  const { removeCart, increaseCart, decreaseCart } = useContext(CartContext);
  return (
    <div className={cx("cart")}>
      <Link to="#">
        <img src={item.image} alt="" className={cx("cart-image")}></img>
      </Link>
      <div className={cx("cart-content")}>
        <div className={cx("cart-title")}>
          <Link to="#">{name} ...</Link>
          <IoIosClose
            className={cx("delete-icon")}
            onClick={() => removeCart(item._id)}
          />
        </div>
        <div className={cx("price-container")}>
          <div className={cx("amount")}>
            <div className={cx("minus")}>
              <FaMinus
                onClick={() => decreaseCart(item._id)}
              />
            </div>
            <div className={cx("number")}>{item.amount}</div>
            <div className={cx("plus")}>
              <FaPlus onClick={() => increaseCart(item._id)} />
            </div>
          </div>
          <div className={cx("item-price")}>
            <p className={cx("price")}>
              $ {parseInt(item.newPrice).toFixed(2)}
            </p>
          </div>
          <div className={cx("total-price")}>
            <p className={cx("price")}>
              $ {parseInt(item.newPrice * item.amount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
