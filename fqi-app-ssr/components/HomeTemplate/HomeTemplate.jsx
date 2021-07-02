import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link'
import get from 'lodash.get';

import Icon from '../Icon/Icon';
import InputTemplate from '../InputTemplate/InputTemplate';
import HomeSlide from '../HomeSlide/HomeSlide';

import layout from '../../hocs/Layout';

import s from './HomeTemplate.scss';

const HomeTemplate = ({content, locations, slidesContent}) => {
  const [selectedTab, setSelectedTab] = useState('retailer');
  const [selectedLocation, setSelectedLocation] = useState(get(locations, [0, 'id'], ''));
  
  const handleChangeLocation = e => {
    setSelectedLocation(e.target.value);
  }
  const handleChangeOption = e => {
    setSelectedTab(e.target.value)
  }
  const { 
    intro,
    page_title,
    produce_tab_title,
    retailer_tab_title,
    retailer_button,
    produce_button,
    type_label,
    location_label
  } = content;
  return (
    <div>
      <div className={classNames('container', s.indexContainer)}>
      
        <div className={s.intro}>
          <h1>{page_title}</h1>
          <h2 className={s.introText}>{intro}</h2>
        </div>

        <div className={s.showMeTabs}>
        
          <InputTemplate label={type_label} classname={classNames(s.inlineSelect)}>
          <select onChange={handleChangeOption}>
            <option value='retailer'>{retailer_tab_title}</option>
            <option value='produce'>{produce_tab_title}</option>
          </select>
          </InputTemplate>

          <InputTemplate label={location_label} classname={classNames(s.inlineSelect)}>
            <select value={selectedLocation} onChange={handleChangeLocation}>
              {locations.map(({id, label}) => (
                <option key={`location-${id}`} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </InputTemplate>

          { selectedTab === 'retailer' && <Link href={`/overallrank?location=${selectedLocation}`} as={`/${selectedLocation}/retailers`}>
              <a className={s.exploreButton}>{retailer_button}</a>
            </Link> }

          { selectedTab === 'produce' && <Link href={`/produce-basket?location=${selectedLocation}`} as={`/${selectedLocation}/produce`}>
              <a className={s.exploreButton}>{produce_button}</a>
            </Link> }
        </div>
      </div>
      {slidesContent.map((slide,index) => {
          return(
            <HomeSlide key={index} content={slide}/>
          )
        })}
    </div>
  );
};


HomeTemplate.propTypes = {
  content: PropTypes.shape(),
  locations: PropTypes.array,
};

export default layout(HomeTemplate);
