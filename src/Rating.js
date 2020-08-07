import React from 'react'

const Rating = props => {
    const { stars } = props
    return <div className="rating">
        {stars == 1 && <span>⭑</span>}
        {stars == 2 && <span>⭑⭑</span>}
        {stars == 3 && <span>⭑⭑⭑</span>}
        {stars == 4 && <span>⭑⭑⭑⭑</span>}
        {stars == 5 && <span>⭑⭑⭑⭑⭑</span>}
    </div>
}

export default Rating