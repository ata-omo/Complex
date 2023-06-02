import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import styles from '../../styles/single-product-page/userReviewForm.module.css';
import { useParams } from 'react-router-dom';

const UserReviewForm = ({setDisplayReviewForm}) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const modalRef = useRef();
    const { id:productId } = useParams;
    const api = `http://localhost:3000/api/v1/products/${productId}/reviews`

    useEffect(() => {
        document.body.style.overflow = "hidden";
        
        return () => {
            document.body.style.overflow = "";
        }
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post(api, {
                rating, 
                title, 
                comment
            });

        }
        catch(err){
            // SHOW ERROR HANDLE PAGE
            console.log(err.response.data.message);
        }

        setRating(0);
        setTitle('');
        setComment('');
        setDisplayReviewForm(false);
    }

  return (
    <div className={styles.modal} ref={modalRef}>
        <div className={styles.closeBtn} onClick={() => {setDisplayReviewForm(false)}}><IoClose /></div>
        <form className={styles.reviewForm} onSubmit={handleSubmit}>
            <h2 className={styles.heading}>Share your thoughts</h2>
            <span>
                <label htmlFor="rating" style={{left:"-9999999px", position: "fixed"}}>Rating</label>
                <ReactStars
                    count={5}
                    size={25}
                    value={rating}
                    onChange={(stars) => {setRating(stars)}}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
            </span>

            <span>
                <label htmlFor={styles.title}>Title</label>
                <input type='text' className={styles.title} id={styles.title} name="title" placeholder='Enter your review title' value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
            </span>

            <span>
                <label htmlFor={styles.comment}>Comment</label>
                <textarea className={styles.comment} id={styles.comment} name="comment" placeholder='Enter your review comment' value={comment} onChange={(e) => {setComment(e.target.value)}}></textarea>
            </span>

            <button type='submit' className={styles.submitBtn}>Submit</button>

        </form>
    </div>
  )
}

export default UserReviewForm