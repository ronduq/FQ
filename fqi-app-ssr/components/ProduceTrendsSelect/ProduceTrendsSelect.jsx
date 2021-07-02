import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'
import InputTemplate from '../InputTemplate/InputTemplate';

import s from './ProduceTrendsSelect.scss';

const ProduceTrendsSelect = ({
  produceList,
  query
}) => {
  const { location, produce } = query;
  const { push } = useRouter();
  
  const handleChange = e => {
    const newProduceId = e.target.value;
    push({
      pathname :'/produce-trends',
      query: { ...query, produce: newProduceId }
    }, `/${location}/produce/${newProduceId}/trends`)
  }

  return (
    <div className={s.locationSelector}>
      <InputTemplate label='Produce' classname={s.customSelect}>
        <select value={produce} onChange={handleChange}>
          {Object.keys(produceList).map((produce) => (
            <option key={`location-${produce}`} value={produce}>
              {produceList[produce].label}
            </option>
          ))}
        </select>
      </InputTemplate>
    </div>
  );
};

ProduceTrendsSelect.propTypes = {
  produceList: PropTypes.shape(),
  query: PropTypes.shape(),
};

export default ProduceTrendsSelect;