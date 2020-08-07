import React from 'react'

const Book = props => {
    const { review, selected, onHover } = props
    const daysToRead = (review.read_at.getTime() - review.started_at.getTime()) / (1000 * 60 * 60 * 24)

    return <div
        className="book"
        key={review.title}
        onMouseEnter={() => onHover(review)}
    >
        {!selected && <img className="cover" src={review.image_url} />}
        {selected &&
            <div className="book-details">
                <div>{review.num_pages + " pages"}</div>
                <div>{review.rating == "0" ? "no rating" : review.rating + " stars"}</div>
                {daysToRead > 0.5 && <div>{Math.round(review.num_pages / daysToRead)} pages per day</div>}
            </div>
        }
    </div>
}

export default Book