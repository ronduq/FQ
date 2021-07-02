import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar';

import s from './MatchCard.scss';

const MatchCard = ({retailersData, retailerId, id, content, viewport, score, type, valueRankText, isSameRankValue}) => {
  let cardContent = {}
  let circleSize = 230;
  if (viewport === 'tablet' || viewport === 'mobile') {
    circleSize = 130;
  }

  const {
    value_circle_text,
    quality_circle_text,
    value_first_text,
    quality_first_text,
    value_second_text,
    quality_second_text,
    value_tied_text,
  } = get(content , [id], {});

  let secondText = quality_second_text;
  if (type === 'value')  { secondText = value_second_text; }
  if (type === 'value' && isSameRankValue) {secondText = value_tied_text}

  return (
    <div className={s.card}>
      <div className={s.progressCircle}>
        <CircularProgressBar
          strokeWidth={10}
          sqSize={circleSize}
          percentage={score}
          text={type === 'value' ? '' : quality_circle_text}
          type={type}
          valueRankText={valueRankText}
        />
      </div>
      <img className={s.cardLogo} alt='retailer name' src={retailersData.itemsLogos[retailerId]}/>
      <p className={s.cardText}>
        {type === 'value' ? value_first_text : quality_first_text} {retailersData.itemsLabels[retailerId]} {secondText}</p>
    </div>
  );
};

MatchCard.propTypes = {
  retailersData: PropTypes.shape(),
  retailerId: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.shape({}),
};

export default MatchCard;
