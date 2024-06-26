import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { AuthContext } from "../../contexts/AuthContext";
import ProductBox from "../../shared/ProductBox/ProductBox";

import styles from "./WishList.module.scss";

const cx = classNames.bind(styles);
function WishList() {
  const { user } = useContext(AuthContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  const getFavorites = async () => {
    if (!user || user === undefined || user === null) {
      alert("You're not authenticated. Please sign in !!");
      navigate("/");
    } else {
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
        alert(error);
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getFavorites();
  }, [user]);
  return (
    <section className={cx("wishlist-section")}>
      <div className={cx("wishlist-container")}>
        {favoriteItems.map((favorite) => (
          <ProductBox
            product={favorite.wineId}
            key={favorite._id}
            refetchData={getFavorites}
          />
        ))}
      </div>
    </section>
  );
}

export default WishList;
