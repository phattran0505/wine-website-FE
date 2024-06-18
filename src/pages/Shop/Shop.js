import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import classNames from "classnames/bind";

import { FilterContext } from "../../contexts/FilterContext";
import { BASE_URL } from "../../config/utils";
import { IoIosClose } from "react-icons/io";
import useFetch from "../../hooks/useFetch";
import Address from "../../shared/Address/Address";
import SideBar from "../../components/SideBar/SideBar";
import ProductBox from "../../shared/ProductBox/ProductBox";

import styles from "./Shop.module.scss";
const cx = classNames.bind(styles);

function Shop() {
  const location = useLocation();
  const [filterWines, setFilterWines] = useState([]);
  const { size, age, setSize, setAge, values, setValues, MIN, MAX } =
    useContext(FilterContext);
  const { data: wines } = useFetch(`${BASE_URL}/wines`);
  const fetchDB = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/wines/search?size=${size}&age=${age}&min=${values[0]}&max=${values[1]}`,
        { method: "get" }
      );
      const result = await res.json();
      setFilterWines(result.data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section className={cx("shop-section")}>
      <Address address={location.pathname.slice(1)} />
      <div className={cx("shop-container")}>
        <SideBar />
        <div className={cx("shop-content")}>
          <div className={cx("shop-title")}>
            <h2>shop</h2>
          </div>
          <div className={cx("sort")}>
            <form>
              <select>
                <option>Default sorting</option>
                <option>Sort by popularity</option>
                <option>Sort by average rating</option>
                <option>Sort by latest</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
              </select>
            </form>
          </div>
          <div className={cx("filter")}>
            <span>Active filters:</span>
            <div className={cx("filter-box", size === 0 ? "none" : "")}>
              <span>Size:</span>
              <div className={cx("value")} onClick={() => setSize(0)}>
                <p>{size}cl</p>
                <IoIosClose />
              </div>
            </div>
            <div className={cx("filter-box", age === 0 ? "none" : "")}>
              <span>Age:</span>
              <div className={cx("value")} onClick={() => setAge(0)}>
                <p>{age} years</p>
                <IoIosClose />
              </div>
            </div>
            <div className={cx("filter-box")}>
              <span>Price:</span>
              <div
                className={cx("value")}
                onClick={() => setValues([MIN, MAX])}
              >
                <p>
                  ${values[0]} - ${values[1]}
                </p>
                <IoIosClose />
              </div>
            </div>
            <span className={cx("search-btn")} onClick={fetchDB}>
              Search
            </span>
          </div>
          <div className={cx("wine-list")}>
            {filterWines.length > 0
              ? filterWines.map((wine) => (
                  <ProductBox product={wine} key={wine._id} />
                ))
              : wines.map((wine) => (
                  <ProductBox product={wine} key={wine._id} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;
