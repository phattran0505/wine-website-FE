import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GoChevronRight, GoChevronLeft} from "react-icons/go";
import { slideDatas } from "../../assets/data/Data";
import lineImg from "../../assets/images/slider-lines.webp";

import "swiper/scss";
import "swiper/scss/navigation";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);
function Header() {
  return (
    <header>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        navigation={{ prevEl: ".prev-button", nextEl: ".next-button" }}
        loop={true}
      >
        {slideDatas?.map((data, index) => (
          <SwiperSlide key={index}>
            <div className={cx("slide-container")}>
              <div className={cx("slide-content")}>
                <div className={cx("title")}>
                  <h1>{data.title}</h1>
                </div>
                <div className={cx("line")}>
                  <img src={lineImg} alt=""></img>
                </div>
                <div className={cx("desc")}>{data.desc}</div>
                <div className={cx("discount")}>
                  get {parseInt(data.discount)}% off
                </div>
                <div className={cx("button")}>
                  <Link to="#">shop now</Link>
                </div>
              </div>
              <div className={cx("slide-image")}>
                <img src={data.image} alt=""></img>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* slide buttons */}
        <div className={cx("slide-buttons")}>
          <div className={cx("slide-button", "prev-button")}>
            <GoChevronLeft />
          </div>
          <div className={cx("slide-button", "next-button")}>
            <GoChevronRight />
          </div>
        </div>
      </Swiper>
    </header>
  );
}

export default Header;
