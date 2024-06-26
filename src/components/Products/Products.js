import classNames from "classnames/bind";

import SubTitle from "../../shared/SubTitle/SubTitle";
import ProductBox from "../../shared/ProductBox/ProductBox";
import { BASE_URL } from "../../config/utils";

import styles from "./Products.module.scss";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function Products() {
  const [wines, setWines] = useState([]);
  const fetchDB = async () => {
    try {
      const res = await fetch(`${BASE_URL}/wines`, { method: "get" });
      const result = await res.json();
      setWines(result.data.slice(0, 8));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchDB();
  }, []);
  return (
    <div className={cx("product-container")}>
      <SubTitle subtitle={"recent products"} />
      <div className={cx("product-list")}>
        {wines.map((product) => (
          <ProductBox key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
