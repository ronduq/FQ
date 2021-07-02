import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CollapseableFilter from '../CollapseableFilter/CollapseableFilter';
import CompareByFilter from '../../components/CompareByFilter/CompareByFilter';

import s from './RetailerProfileFilters.scss';

const RetailerProfileFilters = ({
  retailersData,
  producesData,
  selectAllRetailers,
  selectAllProduces,
  updateRetailer,
  updateProduce,
  currentRetailer,
  compareBy,
  sortRanks,
  filtersContent
}) => {
  const handleSelectAllRetailers = () => {
    // We need to ensure we keep the current retailer selected
    selectAllRetailers(currentRetailer);
  }
  return (
    <>
      <div className={s.filterTitle}>{filtersContent.main_title}</div>
      <CompareByFilter sortRanks={sortRanks} selected={compareBy} showPerception={false} content={filtersContent}/>
        <div className={s.filterContainer}>
          <CollapseableFilter 
            data={retailersData}
            updateItem={updateRetailer}
            selectAllItems={handleSelectAllRetailers}
            currentRetailer={currentRetailer}
            title={filtersContent.retailers}
          />
          <CollapseableFilter 
            data={producesData}
            updateItem={updateProduce}
            selectAllItems={selectAllProduces}
            currentRetailer={currentRetailer}
            title={filtersContent.produce}
          />
        </div>
    </>
  );
};

RetailerProfileFilters.propTypes = {
  retailersData: PropTypes.shape(),
  producesData: PropTypes.shape(),
  selectAllRetailers: PropTypes.func,
  selectAllProduces: PropTypes.func,
  updateRetailer: PropTypes.func,
  updateProduce: PropTypes.func,
  query: PropTypes.shape(),
  compareBy: PropTypes.string,
  sortRanks: PropTypes.func,
};

export default RetailerProfileFilters;