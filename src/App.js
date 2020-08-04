import React from 'react';

export default class App extends React.Component {
  // TODO: Read more than once, fetch details: https://www.goodreads.com/review/show.xml?id=1647848785&key=1vD1GcrriYfBawccVQYlgg
  // TODO: currently reading
  // TODO: More than 200
  // TODO: status based pro-rating

  // Oddly some page counts are missing from the API
  pageCountOverrides = {
    "The Feynman Lectures on Physics Vol 1": 544,
    "Dataclysm: Who We Are (When We Think No One's Looking)": 304,
    "Drive: The Surprising Truth About What Motivates Us": 242,
    "This Is Your Brain on Parasites: How Tiny Creatures Manipulate Our Behavior and Shape Society": 288,
    "All These Worlds (Bobiverse, #3)": 260,
    "For We Are Many (Bobiverse, #2)": 320,
    "Permutation City": 352,
    "Seven Surrenders (Terra Ignota, #2)": 365,
  }

  componentDidMount() {
    fetch('http://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list?v=2&id=46208145&key=1vD1GcrriYfBawccVQYlgg&shelf=read&per_page=200&sort=date_read', {
      headers: {
        'origin': 'localhost:1234'
      }
    }).then(response => response.text())
      .then(xml => {
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(xml, (error, results) => {
          const rawReviews = results.GoodreadsResponse.reviews[0].review
          const reviews = rawReviews.map(this.parseReview)

          const beginningOfYear = new Date(new Date().getFullYear(), 0, 1)
          const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1)
          const readThisYear = []
          reviews.forEach(review => {
            if (review.read_at > beginningOfYear) {
              const timeToRead = review.read_at - review.started_at
              const fractionThisYear = (review.read_at - Math.max(beginningOfYear, review.started_at)) / (1.0 * timeToRead)
              review.pagesThisYear = Math.round(fractionThisYear * review.num_pages)
              readThisYear.push(review)
            }
          })
          const totalPagesThisYear = readThisYear.map(x => x.pagesThisYear).reduce((a, b) => a + b, 0)
          const estimatedPagesByEndOfYear = Math.round(totalPagesThisYear * ((endOfYear - beginningOfYear) / (endOfYear - Date.now())))
          this.setState({ reviews, readThisYear, totalPagesThisYear, estimatedPagesByEndOfYear })
        })
      })
  }

  parseReview = review => {
    const book = review.book[0]
    return {
      title: book.title[0],
      num_pages: +book.num_pages[0] || this.pageCountOverrides[book.title[0]],
      image_url: book.image_url[0],
      rating: review.rating[0],
      started_at: new Date(Date.parse(review.started_at[0])),
      read_at: new Date(Date.parse(review.read_at[0])),
      read_count: review.read_count[0],
    }
  }

  render() {
    if (!this.state) {
      return <div>Fetching...</div>
    }
    return (
      <div className="worm">
        <div>{ "Read this year: " + this.state.totalPagesThisYear + " pages"}</div>
        <div>{ "End of year estimate: " + this.state.estimatedPagesByEndOfYear  + " pages"}</div>
        <div>---------</div>
        {this.state.readThisYear.map(review => {
            return <div key={review.title}>
                {review.title + " (" + (review.rating == "0" ? "no rating" : review.rating + " stars") + ") " + review.pagesThisYear + " pages" + (review.pagesThisYear != review.num_pages ? " (prorated)" : "")}
              </div>
          })
        }
      </div>
    )
  }
}