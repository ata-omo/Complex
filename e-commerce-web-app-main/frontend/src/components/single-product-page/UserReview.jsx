import React from 'react';
import styles from '../../styles/single-product-page/userReview.module.css';
import ReactStars from "react-rating-stars-component"
import {FaUserCircle} from 'react-icons/fa';


const UserReview = ({reviews, setDisplayReviewForm}) => {

  return (
    <section className={styles.reviewSection}>
          <section className={styles.heading}>
            <h3>Ratings &amp; Reviews</h3>
            <button className={styles.writeReviewBtn} onClick={() => {setDisplayReviewForm(true)}}>Rate the Product</button>
          </section>

          <div className={styles.reviews}>
            {
				reviews.map(item => {
					return <article key={item.userId} className={styles.singleReview}>
						<div className={styles.reviewerDetails}>
							<FaUserCircle />
							<p className={styles.username}>{item.username}</p>
						</div>
						<div className={styles.reviewHeading}>
							<div className={styles.userRating}>
								<ReactStars
									count={5}
									edit={false}
									value={item.rating}
									isHalf={true}
									emptyIcon={<i className="far fa-star"></i>}
									halfIcon={<i className="fa fa-star-half-alt"></i>}
									fullIcon={<i className="fa fa-star"></i>}
									activeColor="#ffd700"
								/>
							</div>
							<p className={styles.reviewTitle}>{item.title}</p>
						</div>
						<div className={styles.reviewComment}>
							<p>
								{item.comment}
							</p>
						</div>
					</article>
				})
			}
          </div>
        </section>
  )
}

export default UserReview