import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash.get';
import s from './RetailerProfileTemplate.scss';
import layout from '../../hocs/Layout';
import AggregatedScore from '../AggregatedScore/AggregatedScoreContainer';
import CardList from '../CardList/CardListContainer';
import TableFilter from '../TableFilter/TableFilterContainer';
import RetailerProfileFilters from '../RetailerProfileFilters/RetailerProfileFiltersContainer';
import RetailerHighlightsFilter from '../RetailerHighlightsFilter/RetailerHighlightsFilterContainer';
import NotFoundDisplay from '../NotFoundDisplay/NotFoundDisplay';
import FilterToggle from '../FilterToggle/FilterToggleContainer';
import Tooltip from '../../hocs/TooltipContainer';
import SharePage from '../SharePage/SharePageContainer'

const RetailerProfileTemplate = ({
  compareBy,
  content,
  pageId,
  retailersLabels,
  selectedLocation,
  selectedRetailer,
  query,
  retailerRanks,
  notFoundScreens,
  viewport
}) => {
  const { label: selectedLocationLabel } = selectedLocation;

  const showSharePage = (show) => show && <SharePage 
    compareBy={compareBy}
    id={pageId} 
    includeRetailers
    includeProduces
    viewport={viewport} 
  /> 
  return (
    <div className={classNames('container', s.retailerProfile)}>
      <div className='layout layout--3-9 '>
        <div className='layout__column--1'>
          <FilterToggle>
            <RetailerProfileFilters currentRetailer={query.retailer} compareBy={compareBy} />
          </FilterToggle>
        </div>
        { retailerRanks && retailerRanks.length > 0 &&
          <div className='layout__column--2'>
            <section>

            <div className={s.columnHeader} >
              <Tooltip 
                side='right' 
                size='large'
                bubblePosition='right'
                id='retailer_title'
              >
                <h1 className={s.pageTitle}>{selectedRetailer} <span className={s.seperator}>in</span> <span className={s.location}>{selectedLocationLabel}</span></h1>
              </Tooltip>

                {showSharePage(viewport === 'xlarge')}
              </div>
              
              <AggregatedScore retailersLabels={retailersLabels} query={query} />
            </section>
            <section>
              <Tooltip 
                side='right' 
                size='large'
                bubblePosition='right'
                id='retailer_highlights'
              >
                <h2 className={classNames(s.pageTitle, s.highlights)}>{content.retailer_highlights_title}</h2>
              </Tooltip>  
              <RetailerHighlightsFilter compareBy={compareBy} content={content} />
              <CardList />
            </section>
            <section>
              <TableFilter />

              {showSharePage(viewport !== 'xlarge')}
            </section>
          </div>
        }
        {retailerRanks.length == 0 &&
          <div className='layout__column--2'>
            <h1 className={s.pageTitle}>{selectedRetailer} <span className={s.seperator}>in</span> <span className={s.location}>{selectedLocationLabel}</span></h1>
            <NotFoundDisplay 
              type='apple' 
              title={notFoundScreens[`retailer_profile`].title}
              text={`${notFoundScreens[`retailer_profile`].text} ${selectedRetailer}`} 
            />
          </div>
        }
      </div>
    </div>
  );
};

RetailerProfileTemplate.propTypes = {
  compareBy: PropTypes.string,
  content: PropTypes.shape(),
  retailersLabels: PropTypes.shape(),
  pageId: PropTypes.string,
  selectedLocation: PropTypes.shape(),
  selectedRetailer: PropTypes.string,
  query: PropTypes.shape(),
  viewport: PropTypes.string,
};

RetailerProfileTemplate.defaultProps = {
  content: {
    retailer_highlights_title: 'Retailer Highlights',
  },
  selectedLocation: {
    id: '',
    label: ''
  },
  query: {
    retailer: ''
  }
};

export default layout(RetailerProfileTemplate);