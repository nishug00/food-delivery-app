import React, { useRef, useState, useEffect } from 'react';
import styles from './Reviews.module.css';
import reviewStar from '../../../assets/reviewStar.png';
import { fetchReviewsFromService } from '../../../Services/reviews.service';

function Reviews() {
    const scrollRef = useRef(null); // Ref for the card container
    const [isAtStart, setIsAtStart] = useState(true); // Track if at the start of scroll
    const [isAtEnd, setIsAtEnd] = useState(false); // Track if at the end of scroll
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const imageData = await fetchReviewsFromService();
                setReviews(imageData.data);
                console.log(imageData.data);
            } catch (error) {
                console.error('Error while fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [])

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -scrollRef.current.clientWidth, // Scroll width equal to container width
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: scrollRef.current.clientWidth, // Scroll width equal to container width
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = () => {
        const scrollLeftPosition = scrollRef.current.scrollLeft;
        const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        setIsAtStart(scrollLeftPosition === 0);
        setIsAtEnd(scrollLeftPosition === maxScrollLeft);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.Header}>Customer Reviews</div>
                    <div className={styles.arrows}>
                        <span
                            className={`${styles.leftArrow} ${isAtStart ? styles.disabled : ''}`}
                            onClick={scrollLeft}
                            disabled={isAtStart}
                        >
                            <i className={`codicon codicon-arrow-left ${isAtStart ? styles.disabled : ''}`}></i>
                        </span>

                        <span
                            className={`${styles.rightArrow} ${isAtEnd ? styles.disabled : ''}`}
                            onClick={scrollRight}
                            disabled={isAtEnd}
                        >
                            <i className={`codicon codicon-arrow-right ${isAtEnd ? styles.disabled : ''}`}></i>
                        </span>
                    </div>
                </div>

                <div className={styles.cardWrapper} ref={scrollRef} onScroll={handleScroll}>
                    {reviews.map((review) => (
                        <div className={styles.card} key={review.id}>
                            <div className={styles.cardHeader}>
                                <div className={styles.imageContainer}>
                                    <img src={review.imageUrl.url} alt="reviewer" className={styles.reviewerImage} />
                                </div>
                                <div className={styles.nameLocation}>
                                    <div className={styles.name}>{review.name}</div>
                                    <div className={styles.location}>{review.location}</div>
                                </div>
                                <div className={styles.stars}>
                                    <div>⭐⭐⭐⭐⭐</div>
                                    <div className={styles.date}>{review.reviewedDate}</div>
                                </div>

                            </div>
                            <p className={styles.reviewText}>{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reviews;
