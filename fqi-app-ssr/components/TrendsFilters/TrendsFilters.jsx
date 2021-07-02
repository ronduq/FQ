import React from 'react';
import PropTypes from 'prop-types';

import CompareByFilter from '../CompareByFilter/CompareByFilter';
import CollapseableFilter from '../CollapseableFilter/CollapseableFilter';


import s from './TrendsFilters.scss';

const TrendsFilters = ({
  data,
  selectAll,
  updateSelection,
  compareBy,
  setCompareBy,
  filtersContent,
  title,
}) => {
  return (
    <>
      <div className={s.filterTitle}>{filtersContent.main_title}</div>
        <CompareByFilter sortRanks={setCompareBy} selected={compareBy} showPerception={false} content={filtersContent}/>
        <div className={s.filterContainer}>
          <CollapseableFilter 
            data={data}
            updateItem={updateSelection}
            selectAllItems={selectAll}
            title={title}
          />
        </div>
    </>
  );
};

TrendsFilters.propTypes = {
  data: PropTypes.shape(),
  selectAll: PropTypes.func,
  updateSelection: PropTypes.func,
  compareBy: PropTypes.string,
  setCompareBy: PropTypes.func,
};

export default TrendsFilters;
