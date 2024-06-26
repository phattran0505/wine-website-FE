import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import {
  FaStar,
  FaShoppingCart,
  FaBalanceScale,
  FaHeart,
  FaSearch,
} from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";

import styles from "./ProductBox.module.scss";

const cx = classNames.bind(styles);
function ProductBox({ product, refetchData = () => {} }) {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [heart, setHeart] = useState(product.isFavorite);
  const words = product.name.split(" ");
  const name = words.slice(0, 4).join(" ");

  useEffect(() => {
    if (!user || user === undefined || user === null) {
      setHeart(false);
    }
  }, [user]);

  const toggleFavorites = async (id) => {
    if (!user || user === undefined || user === null) {
      return alert("You're not authenticated. Please sign in !!");
    }
    try {
      const res = await fetch(`${BASE_URL}/favorite`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          wineId: id,
        }),
      });
      if (!res.ok) {
        return alert(res.message);
      }
      setHeart(!heart);
      refetchData();
    } catch (error) {
      return alert(error);
    }
  };
  const handleAddToCart = () => {
    if (!user || user === undefined || user === null) {
      return alert("You're not authenticated. Please sign in !!");
    } else {
      addToCart(product, product._id);
    }
  };
  return (
    <div className={cx("product-box")}>
      <div className={cx("product-image")}>
        <Link to="#">
          <img src={product.image} alt=""></img>
        </Link>
        {product.isSale ? (
          <div className={cx("sale-box")}>
            <span>sale</span>
          </div>
        ) : (
          ""
        )}
        <div className={cx("icons")}>
          <Link to="#">
            <FaBalanceScale />
          </Link>
          <Link
            onClick={() => toggleFavorites(product._id)}
            className={cx(heart ? "heart" : "")}
          >
            <FaHeart />
          </Link>
          <Link to="#">
            <FaSearch />
          </Link>
        </div>
      </div>
      <div className={cx("product-content")}>
        <Link to={`/${product._id}`} className={cx("product-name")}>
          {name}...
        </Link>
        <div className={cx("rate-box")}>
          <div className={cx("price")}>
            {product.isSale ? (
              <p className={cx("old-pirce")}>
                ${parseInt(product.price).toFixed(2)}
              </p>
            ) : (
              ""
            )}
            <p className={cx("product-price")}>
              ${parseInt(product.newPrice).toFixed(2)}
            </p>
          </div>
          <div className={cx("star")}>
            {[...Array(product.star).keys()].map((_, index) => (
              <FaStar key={index} className={cx("star-icon")} />
            ))}
          </div>
        </div>
      </div>
      <Link
        to="#"
        className={cx("btn", "option-btn")}
        onClick={handleAddToCart}
      >
        <FaShoppingCart />
        add to cart
      </Link>
    </div>
  );
}

export default ProductBox;
