import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from '../../components/RadioButton/RadioButton';
import s from './RetailerHighlightsFilter.scss';

const RetailerHighlightsFilter = ({content, compareBy, updateSortDirection, sortDirection}) => {
  const radioGroup = 'retailerHighlights';
  const { 
    best_quality_label,
    worst_quality_label,
    worst_value_label,
    best_value_label,
  } = content;

  return (
    <fieldset className={s.RetailerHighlights}>
      { compareBy === 'quality' && (
        <>
          <RadioButton radioGroup={radioGroup} label={best_quality_label} id='DSC' changeAction={updateSortDirection} selected={sortDirection === 'DSC'}/>
          <RadioButton radioGroup={radioGroup} label={worst_quality_label} id='ASC' changeAction={updateSortDirection} selected={sortDirection === 'ASC'}/>
        </>
      )}

      { compareBy === 'value' && (
        <>
          <RadioButton radioGroup={radioGroup} label={best_value_label} id='ASC' changeAction={updateSortDirection} selected={sortDirection === 'ASC'}/>
          <RadioButton radioGroup={radioGroup} label={worst_value_label} id='DSC' changeAction={updateSortDirection} selected={sortDirection === 'DSC'}/>
        </>
      )}
      
    </fieldset>
  );
};

RetailerHighlightsFilter.propTypes = {
  content: PropTypes.shape(),
  compareBy: PropTypes.string,
  updateSortDirection: PropTypes.func,
  sortDirection: PropTypes.string,
};

export default RetailerHighlightsFilter;
