import React from 'react';
import ProductBreakdown from './breakdownProduct';
import ReviewList from './reviewList';
import API from './APIcalls';


class ReviewApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 61590,
      characteristics: {
      },
      sort: 'newness',
      ratings: {
        1: 1,
        2: 2,
      },
      filterQty: 5,
      starFilters: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
      },
    };
  }

  componentDidMount() {
    this.fetchAPI(this.state.sort);
  }

  fetchAPI(sort) {
    const { id } = this.state;
    API.getReviews(id, sort)
      .then((res) => {
        this.setState({
          reviews: res.data.results,
        });
      })
      .catch(() => {
        console.log('error from API.getReviews in componentDidMount');
      });
    API.getMeta(id)
      .then((res) => {
        this.setState({
          ratings: res.data.ratings,
          recommended: res.data.recommended,
          characteristics: res.data.characteristics,
        });
      })
      .catch(() => {
        console.log('error from API.getMeta in componentDidMount');
      });
  }

  putFeedback(action, review_id) {
    console.log(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/:review_id/${action}`)
    console.log(review_id)
    API.put(action, review_id)
    .then(() =>{
      console.log('putted!')
    })
    .then(() => {
        fetchAPI();
        console.log(`review #', review_id, ' was marked: ${action}`)
      })
      .catch(() => {
        console.log(`error marking review as ${action}`)
      })
  }

  postReview(review) {
    API.post(review)
    .then(()=>{
      fetchAPI();
      console.log(`review was posted!`)
    })
    .catch(() => {
      console.log(`review post failed`)
    })
  }

  sortBy(sort) {
    // this.setState({
    //   sort: sort
    // })
    this.fetchAPI(sort);
  }

  averageRating() {
    let totalStars = 0;
    let qty = 0;
    const { ratings } = this.state;
    const array = Object.keys(ratings);
    array.forEach((star) => {
      totalStars += star * ratings[star];
      qty += Number(ratings[star]);
    });
    return (totalStars / qty).toFixed(1);
  }

  toggleStarFilter(star) {
    console.log('toggle star #', star)
    console.log(this.state.filterQty)
    //if all stars are on, only leave this star on
    if (this.state.filterQty === 5) {
      console.log(1)
      this.setState(prevState => ({
        starFilters: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          [star]: true,
        },
        filterQty: 1
      }))
    } else if (this.state.starFilters[star]) {
      if (this.state.filterQty === 1) {
        //if I just turned off the only filter, then restore all stars
        this.setState({
          starFilters: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
          },
          filterQty: 5,
        })
      } else {
        //if it's not the only filter, just turn it off
        console.log(2)

        this.setState(prevState => ({
          starFilters: {
            ...prevState.starFilters,
            [star]: false,
          },
          filterQty: prevState.filterQty - 1
        }))
      }
    } else { //if the star is not showing, turn it on
      console.log(3)
      this.setState(prevState => ({
        starFilters: {
          ...prevState.starFilters,
          [star]: true,
        },
        filterQty: prevState.filterQty + 1
      }))
    }
  }

  removeStarFilters() {
    this.setState({
      starFilters: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
      },
      filterQty: 5,
    })
  }

  render() {
    const {
      id, starFilters, filterQty, reviews, characteristics, ratings
    } = this.state;
    return (
      <div data-testid="reviewapp">
        <h4>Product Summary</h4>
        <div>
          {`Average Rating: ${this.averageRating()}`}
        </div>
        <ProductBreakdown
          id={id}
          starFilters={starFilters}
          scale={characteristics}
          ratings={ratings}
          toggleStarFilter={this.toggleStarFilter.bind(this)}
          filterQty={filterQty}
          removeStarFilters={this.removeStarFilters.bind(this)}
        />
        <ReviewList
          id={id}
          reviews={reviews}
          starFilters={Object.values(starFilters)}
          sortBy={this.sortBy.bind(this)}
          postReview={this.postReview.bind(this)}
          putFeedback={this.putFeedback.bind(this)}
        />
      </div>
    );
  }
}

export default ReviewApp;
