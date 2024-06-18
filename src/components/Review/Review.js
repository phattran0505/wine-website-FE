import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import { FaStar } from "react-icons/fa";
import ReviewBox from "../../shared/ReviewBox/ReviewBox";

import styles from "./Review.module.scss";
const cx = classNames.bind(styles);
function Review({ name, id }) {
  const { user } = useContext(AuthContext);
  const token = sessionStorage.getItem("accessToken");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [wine,setWine] = useState([])
  const [reviews, setReviews] = useState([]);
  const reviewRef = useRef();
  const usernameRef = useRef();

  const fetchWineDetail = async () => {
    try {
      const res = await fetch(`${BASE_URL}/wines/${id}`, { method: "get" });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      }
      setWine(result.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchWineDetail();
  }, [reviews]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewRef.current.value;
    const username = usernameRef.current.value;
    try {
      if (!user || user === undefined || user === null) {
        return alert("You're not authenticated. Please sign in !!")
      }
      const reviewObj = {
        username: username,
        reviewText: reviewText,
        rating: rating,
      };
      const res = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      setReviews(result.data)
      alert("Review Submitted");
    } catch (error) {
      alert(error.message);
    }
  };
  return (  
    <div className={cx("review-container")}>
      <h2>{wine?.reviews?.length} Reviews {name}</h2>
      <div className={cx("review-list")}>
        {wine?.reviews?.map((review, index) => (
          <ReviewBox key={index} review={review} />
        ))}
      </div>
      <h2>Add a review</h2>
      <p className={cx("email")}>
        Your email address will not be published. Required fields are marked *
      </p>
      <div className={cx("rate-box")}>
        <p>Your rating:</p>
        {[...Array(5).keys()].map((_, index) => {
          index += 1;
          return (
            <span
              key={index}
              onClick={() => setRating(index)}
              onMouseOver={() => setHover(index)}
              onMouseOut={() => setHover(rating)}
              className={cx(index <= hover || index <= rating ? "active" : "")}
            >
              <FaStar key={index} />
            </span>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={cx("input-box")}>
          <label>Your name:</label>
          <input ref={usernameRef}></input>
        </div>
        <div className={cx("input-box")}>
          <label>Your review:</label>
          <textarea cols={45} rows={8} ref={reviewRef}></textarea>
        </div>
        <div className={cx("input-box")}>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}

export default Review;
