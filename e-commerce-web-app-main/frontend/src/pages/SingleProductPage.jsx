import React, { useState, useContext, useEffect, useReducer } from 'react';
import SingleProductPageSlider from '../components/single-product-page/SingleProductPageSlider';
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import styles from '../styles/single-product-page/singleProductPage.module.css';
import UserReview from '../components/single-product-page/UserReview';
import DataContext from '../contexts/DataContext';
import ProductBar from '../components/general/ProductBar';
import ProductDetails from '../components/single-product-page/ProductDetails';
import Error from './Error';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserReviewForm from '../components/single-product-page/UserReviewForm';

const InitialState = {
	isLoading: true,
	isError: false,
	product: null,
	error: null,
};

const ACTIONS = {
	SET_PRODUCT: 'set_product',
    SET_ERROR: 'set_error'
};

const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_PRODUCT:
			return {
                isLoading: false,
                isError: false,
                product: action.payload.product,
			}
		case ACTIONS.SET_ERROR:
            return {
                isLoading: false,
                isError: true,
                error: action.payload.error,
			};

		default: {
			return state;
		}
	}
};

const SingleProductPage = () => {
	const { id: productId } = useParams();

	const [productState, dispatch] = useReducer(reducer, InitialState);
	const [similarProducts, setSimilarProducts] = useState([]);

	const [displayReviewForm, setDisplayReviewForm] = useState(false);

	const { data } = useContext(DataContext);

	useEffect(() => {
		window.scrollTo(0, 0);
		
        const api = `http://localhost:3000/api/v1/products/${productId}`;
		const asyncPerformer = async(api) => {
            try{
                const response = await axios.get(api);
                const data = response.data;

                if(data.success){
                    dispatch({type: ACTIONS.SET_PRODUCT, payload: { product: data.product }})
                }
                else {
                    throw new Error(data.message);
                }
            }
            catch (err) {
                dispatch({type: ACTIONS.SET_ERROR, payload: { error: {message: err.message} }})
            }
        }

        asyncPerformer(api);
	}, [productId]);


	// setting similar products [DELETE LATER - USES LOCAL DATA]
	useEffect(() => {
		setSimilarProducts(data.products);
	}, [data]);

	return (
		<>
			<Header />
			<main className={styles.productPageMain}>
			{productState.isLoading 
			? <Loading />
			: (productState.isError
			? <Error message={productState.error.message} />
			:
			<>
				<div className={styles.product}>
					<div className={styles.left}>
						<SingleProductPageSlider slides={productState.product.images}/>
					</div>
					<div className={styles.right}>
						<ProductDetails product={productState.product}/>
						<UserReview reviews={productState.product.reviews} setDisplayReviewForm={setDisplayReviewForm}/>
					</div>
				</div>

				<div className={styles.similarProducts}>
					<ProductBar
						products={similarProducts}
						limit={6}
						columns={6}
						heading={'Similar Products'}
					/>
				</div>
			</>
			)
			}
			</main>
			{ displayReviewForm && <UserReviewForm setDisplayReviewForm={setDisplayReviewForm}/> }
			<Footer />
		</>
	);
};

export default SingleProductPage;
