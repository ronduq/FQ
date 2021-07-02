import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash.get';
import s from './RetailerTrendsTemplate.scss';
import layout from '../../hocs/Layout';

import FilterToggle from '../FilterToggle/FilterToggleContainer';
import TrendsFilters from '../TrendsFilters/RetailerTrendsFiltersContainer'
import TrendsChart from '../TrendsChart/TrendsChart';
import TrendsLegend from '../TrendsLegend/TrendsLegend';
import TrendsViewBy from '../TrendsViewBy/TrendsViewByRetailerContainer';
import RetailerTrendsSelect from '../RetailerTrendsSelect/RetailerTrendsSelect';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NotFoundDisplay from '../NotFoundDisplay/NotFoundDisplay';
import Tooltip from '../../hocs/TooltipContainer';
import SharePage from '../SharePage/SharePageContainer'

const RetailerTrendsTemplate = ({
  content,
  compareBy,
  isAnyProduceSelected,
  isLoading,
  notFoundContent,
  producesData,
  pageId,
  trendsData,
  retailersList,
  query,
  viewport,
  viewBy,
  location
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeLegendIdx, setLegendIdx] = useState(null);
  const [newLocation, setNewLocation] = useState(location);

  useEffect(() => {
    if (trendsData.length > 0) {
      setSelectedDate(trendsData[trendsData.length - 1].timestamp);
      setLegendIdx(trendsData.length - 1);
    }
  }, [trendsData]);

  const { retailer } = query;
  const handleSetDate = (e) => {
    if (e && e.activeLabel) setSelectedDate(e.activeLabel)
    if (e && typeof e.activeTooltipIndex !== undefined) setLegendIdx(e.activeTooltipIndex)
  }

  const {
    title,
    sub_title_value,
    sub_title_quality,
    legend_title_quality,
    legend_title_value
  } = content;

  const viewByTitle = compareBy === 'quality' ? sub_title_quality : sub_title_value;
  const legendTitle = compareBy === 'quality' ? legend_title_quality : legend_title_value;

  const showSharePage = (show) => show && <SharePage 
    compareBy={compareBy}
    id={pageId} 
    includeProduces
    viewBy={viewBy}
    viewport={viewport} 
  />

  if (newLocation === location) {
    return (
      <div className={classNames('container', s.produceTrends)}>
        <div className='layout layout--3-9'>
          <div className='layout__column--1'>
            <FilterToggle>
              <TrendsFilters 
                data={producesData} 
                compareBy={compareBy} 
              />
            </FilterToggle>
          </div>
          <div className='layout__column--2'>

            <div className={s.columnHeader} >
              <RetailerTrendsSelect
                retailersList={retailersList}
                query={query} 
              />

              {showSharePage(viewport === 'xlarge')}
                
            </div>
            
            <div className={s.contentWrapper}>
              <div className={s.title}>
                <Tooltip 
                  side='right' 
                  size='large'
                  bubblePosition='right'
                  id='retailer_trends_title'
                >
                  <h2>{get(retailersList, [retailer, 'label'])} {title} </h2>
                </Tooltip>  
              </div>

              <div className={classNames(s.chart, {[s.noResult]: !isAnyProduceSelected})}>
                { isLoading && <LoadingSpinner /> }

                <TrendsViewBy
                  title={viewByTitle}
                  viewBy={viewBy}
                />

                <TrendsChart 
                  data={trendsData} 
                  selectedDate={selectedDate} 
                  handleSetDate={handleSetDate}
                  viewport={viewport}
                  items={producesData.items}
                  viewType={viewBy}
                  compareBy={compareBy}
                />
              </div>

              <div className={classNames(s.legend, {[s.noResult]: !isAnyProduceSelected})}>
                <TrendsLegend 
                  trendData={trendsData[activeLegendIdx]}
                  items={producesData.items}
                  itemsLabels={producesData.itemsLabels}
                  pageType="retailer"
                  sortBy={compareBy} 
                  selectedDate={selectedDate} 
                  title={legendTitle}
                  viewType={viewBy}
                  query={query}
                  notAvailable={content.na}
                />
              </div>

              { !isAnyProduceSelected && 
                <NotFoundDisplay 
                  classname={s.notFound} 
                  title={notFoundContent.title} 
                  text={notFoundContent.text} 
                  type="notFoundVeg"
                />}

              {showSharePage(viewport !== 'xlarge')}

            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classNames('container', s.produceTrends, s.emptyContainer)}></div>
    );
  }
};

RetailerTrendsTemplate.propTypes = {
  content: PropTypes.shape(),
  isAnyProduceSelected: PropTypes.bool,
  isLoading: PropTypes.bool,
  notFoundContent: PropTypes.shape(),
  producesData: PropTypes.shape(),
  pageId: PropTypes.string,
  retailersList: PropTypes.shape(),
  compareBy: PropTypes.string,
  query: PropTypes.shape(),
  viewport: PropTypes.string,
  viewBy: PropTypes.string,
};

RetailerTrendsTemplate.defaultProps = {
  content: {}
};

export default layout(RetailerTrendsTemplate);