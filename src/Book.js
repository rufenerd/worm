import React from 'react'

class Book extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovered: false,
        }
    }

    render() {
        const { review } = this.props
        const daysToRead = (review.read_at.getTime() - review.started_at.getTime()) / (1000 * 60 * 60 * 24)

        return <div
            className="book"
            key={review.title}
            onMouseEnter={() => this.setState({ hovered: true })}
            onMouseLeave={() => this.setState({ hovered: false })}
        >
            {!this.state.hovered && <img className="cover" src={review.image_url} />}
            {this.state.hovered &&
                <div className="book-details">
                    <div>{review.num_pages + " pages"}</div>
                    <div>{review.rating == "0" ? "no rating" : review.rating + " stars"}</div>
                    {daysToRead > 0.5 && <div>{Math.round(review.num_pages / daysToRead)} pages per day</div>}
                </div>
            }
        </div>
    }
}

export default Book