import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash.get';
import s from './ProduceTrendsTemplate.scss';
import layout from '../../hocs/Layout';

import FilterToggle from '../FilterToggle/FilterToggleContainer';
import TrendsFilters from '../TrendsFilters/ProduceTrendsFiltersContainer'
import TrendsChart from '../TrendsChart/TrendsChart';
import TrendsLegend from '../TrendsLegend/TrendsLegend';
import TrendsViewBy from '../TrendsViewBy/TrendsViewByProduceContainer';
import ProduceTrendsSelect from '../ProduceTrendsSelect/ProduceTrendsSelect';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NotFoundDisplay from '../NotFoundDisplay/NotFoundDisplay';
import Tooltip from '../../hocs/TooltipContainer';
import SharePage from '../SharePage/SharePageContainer'

const ProduceTrendsTemplate = ({
  content,
  compareBy,
  isAnyRetailersSelected,
  isLoading,
  notFoundContent,
  pageId,
  retailerData,
  trendsData,
  produceList,
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

  const { produce } = query;
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
    includeRetailers
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
                data={retailerData} 
                compareBy={compareBy}
              />
            </FilterToggle>
          </div>
          <div className='layout__column--2'>

            <div className={s.columnHeader} >
              <ProduceTrendsSelect
                produceList={produceList}
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
                  id='produce_trends_title'
                >
                  <h2>{get(produceList, [produce, 'label'])} {title}</h2>
                </Tooltip>
              </div>

              <div className={classNames(s.chart, {[s.noResult]: !isAnyRetailersSelected})}>
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
                  items={retailerData.items}
                  viewType={viewBy}
                  compareBy={compareBy}
                />
              </div>

              <div className={classNames(s.legend, {[s.noResult]: !isAnyRetailersSelected})}>
                <TrendsLegend 
                  trendData={trendsData[activeLegendIdx]}
                  items={retailerData.items}
                  itemsLabels={retailerData.itemsLabels}
                  pageType="produce"
                  sortBy={compareBy} 
                  selectedDate={selectedDate}
                  title={legendTitle}
                  viewType={viewBy}
                  query={query}
                  notAvailable={content.na}
                />
              </div>
  
              { !isAnyRetailersSelected && 
                <NotFoundDisplay 
                  classname={s.notFound} 
                  title={notFoundContent.title} 
                  text={notFoundContent.text} 
                  type="homeIcon"
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

ProduceTrendsTemplate.propTypes = {
  content: PropTypes.shape(),
  isAnyRetailersSelected: PropTypes.bool,
  isLoading: PropTypes.bool,
  notFoundContent: PropTypes.shape(),
  retailerData: PropTypes.shape(),
  pageId: PropTypes.string,
  produceList: PropTypes.shape(),
  compareBy: PropTypes.string,
  query: PropTypes.shape(),
  viewport: PropTypes.string,
  viewBy: PropTypes.string,
};

ProduceTrendsTemplate.defaultProps = {
  content: {}
};

export default layout(ProduceTrendsTemplate);