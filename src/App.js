import React from 'react';
import Spinner from './Spinner'
import Book from './Book'

export default class App extends React.Component {
  // TODO: Read more than once, fetch details: https://www.goodreads.com/review/show.xml?id=1647848785&key=ScVT98d1ZDPB8Ay3ow1ZQ
  // TODO: currently reading
  // TODO: More than 200
  // TODO: other years
  // TODO: charting

  // Oddly some page counts are missing from the API
  pageCountOverrides = {
    "The Body: A Guide for Occupants": 450,
    "The Feynman Lectures on Physics Vol 1": 544,
    "Dataclysm: Who We Are (When We Think No One's Looking)": 304,
    "Drive: The Surprising Truth About What Motivates Us": 242,
    "This Is Your Brain on Parasites: How Tiny Creatures Manipulate Our Behavior and Shape Society": 288,
    "All These Worlds (Bobiverse, #3)": 260,
    "For We Are Many (Bobiverse, #2)": 320,
    "Permutation City": 352,
    "Seven Surrenders (Terra Ignota, #2)": 365,
  }

  imageOverrides = {
    "Ready Player One (Ready Player One, #1)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1390275705l/20603758.jpg",
    "Network Effect (The Murderbot Diaries, #5)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1568667704l/52381770._SX318_SY475_.jpg",
    "The Feynman Lectures on Physics Vol 1": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347350001l/17278.jpg",
    "Parable of the Sower (Earthseed, #1)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442169447l/52397._SY475_.jpg",
    "Dataclysm: Who We Are (When We Think No One's Looking)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1407763834l/21480734.jpg",
    "Drive: The Surprising Truth About What Motivates Us": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348931599l/6452796.jpg",
    "Sapiens: A Brief History of Humankind": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1595674533l/23692271._SY475_.jpg",
    "Morning Star (Red Rising, #3)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1461354277l/18966806.jpg",
    "Golden Son (Red Rising, #2)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1394684475l/18966819.jpg",
    "Death's End (Remembrance of Earth’s Past, #3)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1430330507l/25451264.jpg",
    "This Is Your Brain on Parasites: How Tiny Creatures Manipulate Our Behavior and Shape Society": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1445050332l/25897836.jpg",
    "All These Worlds (Bobiverse, #3)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1498271736l/35506021._SY475_.jpg",
    "For We Are Many (Bobiverse, #2)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1486436760l/34153598._SY475_.jpg",
    "We Are Legion (We Are Bob) (Bobiverse, #1)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474344826l/32109569._SY475_.jpg",
    "Thinking, Fast and Slow": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1317793965l/11468377.jpg",
    "Permutation City": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1287341300l/156784.jpg",
    "The Private Life of Plants: A Natural History of Plant Behaviour": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387740578l/413678.jpg",
    "Moonwalking with Einstein: The Art and Science of Remembering Everything": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347705105l/6346975.jpg",
    "Seven Surrenders (Terra Ignota, #2)": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1517514624l/28220647._SY475_.jpg",
    "How the Mind Works": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387741747l/835623.jpg",
    "On Intelligence": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1441230921l/27539._SY475_.jpg",
    "Introduction to the Theory of Computation": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347452544l/400716.jpg",
    "Machine Super Intelligence": "https://images-na.ssl-images-amazon.com/images/I/31QfVfw7FbL._BO1,204,203,200_.jpg",
    "I Am a Strange Loop": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442775722l/123471._SX318_.jpg",
    "The Diamond Age: Or, A Young Lady's Illustrated Primer": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388180931l/827.jpg",
    "The Information: A History, a Theory, a Flood": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348046486l/8701960.jpg",
    "Einstein's Dreams": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925066l/14376.jpg",
    "The Elegant Universe: Superstrings, Hidden Dimensions, and the Quest for the Ultimate Theory": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348791881l/8049273.jpg",
    "Textbook of Medical Physiology": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4160/9781416045748.jpg",
  }

  componentDidMount() {
    this.setState({ fetching: 3 })
    fetch('https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list?v=2&id=46208145&key=ScVT98d1ZDPB8Ay3ow1ZQ&shelf=read&per_page=200&sort=date_read', {
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
          this.setState({ reviews, fetching: this.state.fetching - 1 })
        })
      })

    fetch('https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list?v=2&id=46208145&key=ScVT98d1ZDPB8Ay3ow1ZQ&shelf=currently-reading&per_page=200&sort=date_read', {
      headers: {
        'origin': 'localhost:1234'
      }
    }).then(response => response.text())
      .then(xml => {
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(xml, (error, results) => {
          const rawReviews = results.GoodreadsResponse.reviews[0].review
          const currentReviews = rawReviews.map(this.parseReview)
          currentReviews.forEach(review => review.current = true)
          this.setState({ currentReviews: currentReviews, fetching: this.state.fetching - 1 })
        })
      })

    fetch('https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list?v=2&id=46208145&key=ScVT98d1ZDPB8Ay3ow1ZQ&shelf=half-read&per_page=200&sort=date_read', {
      headers: {
        'origin': 'localhost:1234'
      }
    }).then(response => response.text())
      .then(xml => {
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(xml, (error, results) => {
          const rawReviews = results.GoodreadsResponse.reviews[0].review
          const halfReadReviews = rawReviews.map(this.parseReview)
          this.setState({ halfReadReviews, fetching: this.state.fetching - 1 })
        })
      })
  }

  parseReview = review => {
    const book = review.book[0]
    const title = book.title[0]
    console.log(title)
    return {
      title: book.title[0],
      num_pages: this.pageCountOverrides[title] || +book.num_pages[0],
      image_url: this.imageOverrides[title] || book.image_url[0],
      rating: review.rating[0],
      started_at: new Date(Date.parse(review.started_at[0])),
      read_at: new Date(Date.parse(review.read_at[0])),
      read_count: review.read_count[0],
    }
  }

  selectReview = selectedReview => {
    this.setState({ selectedReview })
  }

  render() {
    if (!this.state || this.state.fetching) {
      return <Spinner />
    }
    const beginningOfYear = new Date(new Date().getFullYear(), 0, 1)
    const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1)
    const readThisYear = []
    this.state.reviews.forEach(review => {
      if (review.read_at > beginningOfYear) {
        const timeToRead = review.read_at - review.started_at
        const fractionThisYear = (review.read_at - Math.max(beginningOfYear, review.started_at)) / (1.0 * timeToRead)
        review.pagesThisYear = Math.round(fractionThisYear * review.num_pages)
        readThisYear.push(review)
      }
    })

    const mostRecentlyRead = this.state.reviews.slice(0, 10)
    const earliestMostRecentStart = Math.min(...mostRecentlyRead.map(review => review.started_at.getTime()))
    const latestMostRecentEnd = Math.max(...mostRecentlyRead.map(review => review.read_at.getTime()))
    const mostRecentPages = mostRecentlyRead.reduce((m, a) => m + a.num_pages, 0)
    const recentReadingRatePerMillisecond = mostRecentPages / (latestMostRecentEnd - earliestMostRecentStart)
    const estimatedPagesReadOfCurrent = Math.round(0.5 * this.state.currentReviews.reduce((m, a) => {
      return m + Math.max(a.num_pages, recentReadingRatePerMillisecond * (Date.now() - a.started_at.getTime()))
    }, 0) / this.state.currentReviews.length)
    const halfReadTitles = this.state.halfReadReviews.map(x => x.title)
    const totalPagesThisYear = Math.round(estimatedPagesReadOfCurrent + readThisYear.map(x => halfReadTitles.includes(x.title) ? x.pagesThisYear * 0.4 : x.pagesThisYear).reduce((a, b) => a + b, 0))
    const estimatedPagesByEndOfYear = Math.round(totalPagesThisYear * ((endOfYear - beginningOfYear) / (Date.now() - beginningOfYear)))

    return (
      <div className="worm">
        <div className="stats">
          <div className="stat"><span>{totalPagesThisYear}</span> pages so far this year</div>
          <div className="stat"><span>{estimatedPagesByEndOfYear}</span> estimated pages at end of year</div>
        </div>
        <div className="books">
          {
            this.state.currentReviews.concat(this.state.reviews).map(review => {
              return <Book review={review} onHover={this.selectReview} selected={this.state.selectedReview == review} />
            })
          }
        </div>
      </div>
    )
  }
}
