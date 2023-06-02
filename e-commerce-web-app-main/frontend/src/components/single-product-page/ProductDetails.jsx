import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import styles from '../../styles/single-product-page/productDetails.module.css';

const ProductDetails = ({product}) => {

	const { title, ratings, stock, price, highlights, description, specifications } = product;
	const reviewCount = product.reviews.length;

	return <section className={styles.productDetailsSection}>
		<h2 className={styles.productTitle}>{title}</h2>
		<div className={styles.ratingsAndReviews}>
			<span className={styles.rating}>
				<span>{ratings.value}</span>
				<AiFillStar />
			</span>
			<span className={styles.ratingCount}>
				{ratings.count.toLocaleString('en-IN')} Ratings &amp; {reviewCount.toLocaleString('en-IN')} Reviews
			</span>
		</div>
		{
			(stock <= 5) && <div className={styles.stock}>Hurry up Only {stock} left in stock</div>
		}
		<div className={styles.price}>
			{
				price.toLocaleString('en-IN', {
					maximumFractionDigits: 0,
					style: 'currency',
					currency: 'INR'
				})
			}
		</div>
		{
			(highlights.length > 0) && <div className={styles.highlights}>
				<span>Highlights</span>
				<ul className={styles.highlightsList}>
					{
						highlights.map((item, index) => <li key={'highlights' + index}>{item}</li>)
					}
				</ul>
			</div>
		}
		<div className={styles.description}>
			<span>Description</span>
			<p>{ description }</p>
		</div>
		{
			(specifications.length > 0) && <div className={styles.specs}>
				<h2 className={styles.specsHeading}>Specifications</h2>
				{
					specifications.map((specType) => 
						<div key={'specs+'+specType.category} className={styles.singleSpec}>
							<h3 className={styles.specCategoryName}>{specType.category}</h3>
							<ul className={styles.specTitleAndValue}>
								{
									specType.content.map((spec) =>
										<li key={specType.category + spec.specTitle}><span className={styles.specTitle}>{spec.specTitle}</span><span>{spec.specValue}</span></li>
									)
								}
							</ul>
						</div>
					)
				}
			</div>
		}
	</section>;
};

export default ProductDetails;
