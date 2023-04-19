import React from 'react';
import Spinner from './Spinner'
import Book from './Book'

export default class App extends React.Component {
  // TODO: Read more than once, fetch details: https://www.goodreads.com/review/show.xml?id=1647848785&key=Yrv8zSSjO4RxeVhvGPJVGw
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
    "This Is Your Brain On Parasites: How Tiny Creatures Manipulate Our Behavior and Shape Society": 288,
    "No Mud, No Lotus: The Art of Transforming Suffering": 128,
    "Life on the Edge: The Coming of Age of Quantum Biology": 368,
    "I Am a Strange Loop": 436,
    "Introduction to the Theory of Computation": 456,
    "Superintelligence: Paths, Dangers, Strategies": 352,
    "The Devil in the White City": 447,
    "The Second Machine Age: Work, Progress, and Prosperity in a Time of Brilliant Technologies": 336,
    "Attached: The New Science of Adult Attachment and How It Can Help You Find—and Keep—Love": 304,
    "Positively Fifth Street: Murderers, Cheetahs, and Binion's World Series of Poker": 436,
    "Heaven's River (Bobiverse, #4)": 632,
    "Tribe: On Homecoming and Belonging": 182,
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
    "The Happiness Trap: How To Stop Struggling And Start Living": "https://cdn.mall.adeptmind.ai/https%3A%2F%2Fslimages.macys.com%2Fis%2Fimage%2FMCY%2Fproducts%2F2%2Foptimized%2F22334622_fpx.tif_large.jpg",
    "Accelerando": "https://upload.wikimedia.org/wikipedia/en/0/0b/Accelerando_%28book_cover%29.jpg",
    "Dawn (Xenogenesis, #1)": "http://cdn.shopify.com/s/files/1/0117/0387/7732/products/Screenshot_20210623-102417_Amazon_Shopping_1200x1200.jpg?v=1624469293",
    "Foundation and Empire (Foundation, #2)": "https://m.media-amazon.com/images/I/51A5vtTsm6L._AC_UF350,350_QL80_.jpg",
    "Exhalation": "https://m.media-amazon.com/images/I/71AethrQRRL._AC_UF1000,1000_QL80_.jpg",
    "Fungal Biology": "https://m.media-amazon.com/images/I/71fKpYZD7NL._AC_UF1000,1000_QL80_.jpg",
    "Adulthood Rites (Xenogenesis, #2)": "https://cdn.shopify.com/s/files/1/0367/4406/9251/products/9781538753729_1024x1024@2x.jpg?v=1631841983",
    "Binti (Binti, #1)": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1537451443i/41189624.jpg",
    "This Is Your Brain On Parasites: How Tiny Creatures Manipulate Our Behavior and Shape Society": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1445050332i/25897836.jpg",
    "The Diamond Age: Or, a Young Lady's Illustrated Primer": "https://images-na.ssl-images-amazon.com/images/I/91Vy63eUhHL._AC_UL210_SR210,210_.jpg",
    "Heaven's River (Bobiverse, #4)": "https://m.media-amazon.com/images/I/41S-0lqypRL.jpg",
    "Emergency Skin": "https://knightagency.net/wp-content/uploads/2020/04/es.png",
  }

  componentDidMount() {
    this.setState({ fetching: 3 })
    fetch('https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list?v=2&id=46208145&key=Yrv8zSSjO4RxeVhvGPJVGw&shelf=read&per_page=200&sort=date_read', {
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

    fetch('https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list?v=2&id=46208145&key=Yrv8zSSjO4RxeVhvGPJVGw&shelf=currently-reading&per_page=200&sort=date_read', {
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

    fetch('https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list?v=2&id=46208145&key=Yrv8zSSjO4RxeVhvGPJVGw&shelf=half-read&per_page=200&sort=date_read', {
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
