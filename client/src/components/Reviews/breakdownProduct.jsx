import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import RatingBreakdown from './breakdownRating';
import ScaleBreakdown from './breakdownScale';

const Breakdown = styled.div`
  flex: 1 1 0;
  align-items: flex-end;
  padding: 0px 50px;
`;

const FlexRow = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;
const Average = styled.h2`
  font-size: 100px;
  margin:0px;
`;



const ProductBreakdown = function (props) {
  const {
    id, scale, ratings, starFilters, filterQty, scaleSelections
  } = props;
  const clickHandler = function (event) {
    event.preventDefault();
    props.removeStarFilters();
  };
  const totalReviews = Object.values(ratings).reduce((a, b) => Number(a) + Number(b))

  if (typeof ratings !== 'object') { return null; }

  const stars = Object.keys(ratings).map((rating) => (
    <RatingBreakdown
      key={rating}
      star={rating}
      qty={ratings[rating]}
      totalReviews={totalReviews}
      toggleStarFilter={props.toggleStarFilter}
      removeStarFilters={props.removeStarFilter}
      TextButton={props.TextButton}
    />
  ));
  const avgRating = () => {
    var avgStar = '';
    for (let i = 1; i <= 5; i++) {
      if (props.avg > i) {
        avgStar += '★'
      } else if (i - props.avg > 1) {
        avgStar += '☆'
      } else {
        avgStar += "1/2"
      }
    }
    return avgStar;
  };

  return (
    <Breakdown data-testid="productbreakdown">
      {/* <i class="fas fa-question-circle"></i> */}
      <FlexRow>
        <Average>{props.avg}</Average>
        <FlexRow>{avgRating()}</FlexRow>
        <FontAwesomeIcon icon={faCoffee} />
      </FlexRow>
      <div>{stars}</div>
      {filterQty < 5
        ? (
          <div>
            <button onClick={clickHandler}>Clear Filters</button>
          </div>
        )
        : <br></br>}
      <ScaleBreakdown scale={scale} scaleSelections={scaleSelections} />
    </Breakdown>
  );
};

export default ProductBreakdown;
