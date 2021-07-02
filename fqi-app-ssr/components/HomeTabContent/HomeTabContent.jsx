import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon/Icon';
import InputTemplate from '../InputTemplate/InputTemplate';

import s from './HomeTabContent.scss';

const HomeTabContent = ({ comingSoonText, handleChangeLocation, locations, selectedLocation }) => (
  <div className={s.tabContent}>
    <InputTemplate label='Near' classname={classNames(s.locationSelect)}>
      <select value={selectedLocation} onChange={handleChangeLocation}>
        {locations.map(({id, label}) => (
          <option key={`location-${id}`} value={id}>
            {label}
          </option>
        ))}
      </select>
    </InputTemplate>

    <p className={s.comingSoon}>
      <Icon className={s.locationIcon} iconName={`location`} /> 
     {comingSoonText}
    </p>
  </div>
);

HomeTabContent.propTypes = {
  comingSoonText: PropTypes.string,
  handleChangeLocation: PropTypes.func,
  locations: PropTypes.array,
  selectedLocation: PropTypes.string,
};

export default HomeTabContent;
