import React from 'react'
import Rating from './Rating'

const Book = props => {
    const { review, selected, onHover } = props
    const daysToRead = (review.read_at.getTime() - review.started_at.getTime()) / (1000 * 60 * 60 * 24)

    return <div
        className="book"
        key={review.title}
        onMouseEnter={() => onHover(review)}
        onMouseLeave={() => onHover(null)}
    >
        {!selected && <img className="cover" src={review.image_url} />}
        {selected &&
            <div className="book-details">
                {review.current && <div>Reading</div>}
                <div>{review.num_pages + " pages"}</div>
                <Rating stars={review.rating} />
                {daysToRead > 0.5 && <div>{Math.round(review.num_pages / daysToRead)} pages/day</div>}
            </div>
        }
    </div>
}

export default Book