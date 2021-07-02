import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CollapseableFilter from '../CollapseableFilter/CollapseableFilter';
import CompareByFilter from '../CompareByFilter/CompareByFilter';

import s from './BestPicksFilters.scss';

const BestPicksFilters = ({
  retailersData,
  producesData,
  selectAllRetailers,
  selectAllProduces,
  updateRetailer,
  updateProduce,
  currentRetailer,
  filtersContent,
  sortBestPicks,
  criteria
}) => {
  const handleSelectAllRetailers = () => {
    const sortBy = criteria ? criteria : 'quality';
    selectAllRetailers(currentRetailer,sortBy);
  }
  const handleSelectAllProduces = () => {
    const sortBy = criteria ? criteria : 'quality';
    selectAllProduces(currentRetailer,sortBy);
  }
  return (
    <>
      <div className={s.filterTitle}>{filtersContent.main_title}</div>
        <CompareByFilter sortRanks={sortBestPicks} selected={criteria ? criteria : 'quality' } showPerception={false} content={filtersContent}/>
        <div className={s.filterContainer}>
          <CollapseableFilter 
            data={producesData}
            updateItem={updateProduce}
            selectAllItems={handleSelectAllProduces}
            currentRetailer={currentRetailer}
            criteria={criteria}
            title={filtersContent.produce}
          />
          <CollapseableFilter 
            data={retailersData}
            updateItem={updateRetailer}
            selectAllItems={handleSelectAllRetailers}
            currentRetailer={currentRetailer}
            criteria={criteria}
            title={filtersContent.retailers}
          />
        </div>
    </>
  );
};

BestPicksFilters.propTypes = {
  retailersData: PropTypes.shape(),
  producesData: PropTypes.shape(),
  selectAllRetailers: PropTypes.func,
  selectAllProduces: PropTypes.func,
  updateRetailer: PropTypes.func,
  updateProduce: PropTypes.func,
  query: PropTypes.shape(),
};

export default BestPicksFilters;