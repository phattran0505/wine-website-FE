import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import SubTitle from "../../shared/SubTitle/SubTitle";

import styles from "./Featured.module.scss";
import ProductBox from "../../shared/ProductBox/ProductBox";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function Featured() {
  const [featured, setFeatured] = useState([]);
  const fetchDB = async () => {
    try {
      const res = await fetch(`${BASE_URL}/wines/featured`, { method: "get" });
      const result = await res.json();
      setFeatured(result.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchDB();
  }, []);
  return (
    <div className={cx("featured-container")}>
      <SubTitle subtitle={"featured products"} />
      <div className={cx("featured-list")}>
        {featured.map((product, index) => (
          <ProductBox product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Featured;
