import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Icon from '../Icon/Icon';
import LinkButton from '../LinkButton/LinkButton';

import { generateQuerystring } from '../../utils'
import s from './AggregatedScore.scss';

const AggregatedScore = ({
  retailersLabels,
  retailerRankData,
  query,
  buttonContent,
}) => {
  const { location, retailer } = query;
  return ( 
    <div className={s.aggregatedScore}>

      <div className={s.retailerRank}>
        <p className={s.title}>{get(retailersLabels, 'retailer_rank_title')}</p>
        <p className={s.desc}>{get(retailersLabels, 'single_produce_average_title')}</p>
      </div>

      <ul className={s.retailerData}>
        <li>
          <span className={s.heading}>{retailersLabels.quality}</span>
          {/* <Icon className={s.starIcon} iconName="star" /> */}
          <span className={s.score}>{get(retailerRankData, ['quality'], retailersLabels.no_value)}%</span>
        </li>
          <li>
            <span className={s.heading}>{retailersLabels.value}</span>
            {/* <Icon className={s.dollarIcon} iconName="dollar" /> */}
            <span className={s.score}>{get(retailerRankData, ['value'], retailersLabels.no_value)}</span>
          </li>
          <li>
            <span className={s.heading}>{retailersLabels.perception}</span>
            {/* <Icon className={s.diamondIcon} iconName="diamond" /> */}
            <span className={s.score}>{get(retailerRankData, ['perception'], retailersLabels.no_value)}</span>
          </li>
      </ul>

      <div className={s.linkWrapper}>
        <LinkButton 
          label={buttonContent.view_retailer_trends}
          as={`/${location}/retailers/${retailer}/trends`} 
          href={`/retailer-trends?${generateQuerystring(query)}`}
        />
      </div>
     
    </div>
       
  );
};

AggregatedScore.propTypes = {
  retailersLabels: PropTypes.shape().isRequired,
  retailerRankData: PropTypes.shape(),
  query: PropTypes.shape(),
};

AggregatedScore.defaultProps = {
  retailerRankData: {},
}

export default AggregatedScore;
