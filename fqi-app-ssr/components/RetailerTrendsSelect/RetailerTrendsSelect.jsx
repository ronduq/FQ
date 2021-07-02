import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'
import get from 'lodash.get';
import InputTemplate from '../InputTemplate/InputTemplate';

import s from './RetailerTrendsSelect.scss';

const RetailerTrendsSelect = ({
  retailersList,
  query
}) => {
  const { location, retailer } = query;
  const { push } = useRouter();
  
  const handleChangeRetailer = e => {
    const newRetailerId = e.target.value;
    push({
      pathname :'/retailer-trends',
      query: { ...query, retailer: newRetailerId }
    }, `/${location}/retailers/${newRetailerId}/trends`)
  }

  return (
    <div className={s.locationSelector}>
      <InputTemplate label='Retailer' classname={s.customSelect}>
        <select value={retailer} onChange={handleChangeRetailer}>
          {Object.keys(retailersList).map((retailer) => (
            <option key={`location-${retailer}`} value={retailer}>
              {retailersList[retailer].label}
            </option>
          ))}
        </select>
      </InputTemplate>
      <img src={get(retailersList, [retailer, 'logo'], '')} />
    </div>
  );
};

RetailerTrendsSelect.propTypes = {
  retailersList: PropTypes.shape(),
  query: PropTypes.shape(),
};

export default RetailerTrendsSelect;