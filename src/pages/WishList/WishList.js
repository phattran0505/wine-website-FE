import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { AuthContext } from "../../contexts/AuthContext";
import { toastifyWarn, toastifyError } from "../../shared/Toastify/Toastify";
import { FaRegHeart } from "react-icons/fa";
import ProductBox from "../../shared/ProductBox/ProductBox";

import styles from "./WishList.module.scss";

const cx = classNames.bind(styles);
function WishList() {
  const { user } = useContext(AuthContext);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const getFavorites = async () => {
    try {
      const res = await fetch(`${BASE_URL}/favorite/${user._id}`, {
        method: "get",
      });
      if (!res.ok) {
        return alert(res.message);
      }
      const result = await res.json();
      setFavoriteItems(result.data);
    } catch (error) {
      return toastifyError(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getFavorites();
  }, [user]);
  return (
    <section className={cx("wishlist-section")}>
      <div className={cx("wishlist-container")}>
        {favoriteItems.length > 0 ? (
          <div className={cx("wishlist-product")}>
            {favoriteItems.map((favorite) => (
              <ProductBox
                product={favorite.wineId}
                key={favorite._id}
                refetchData={getFavorites}
              />
            ))}
          </div>
        ) : (
          <div className={cx("empty-container")}>
            <div className={cx("empty-content")}>
              <span className={cx("heart-icon")}>
                <FaRegHeart />
              </span>
              <h1>Wishlist is empty.</h1>
              <p>
                You don't have any products in the wishlist yet. <br></br> You
                will find a lot of interesting products on our "Shop" page.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default WishList;
