import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon/Icon';

import s from './HomeTabs.scss';

const HomeTabs = ({ produceTabText, retailerTabText, selectedTab, setSelectedTab }) => (
  <ul className={s.tabNav}>
    <li className={classNames({[s.tabSelected]: selectedTab === 'retailer', [s.retailerNotSelect]: selectedTab !== 'retailer'})}>
      <button onClick={() => setSelectedTab('retailer')}>
        <Icon className={s.tabIcon} iconName={`homeIcon`} />
        {retailerTabText}
      </button>
    </li>
    <li className={classNames({[s.tabSelected]: selectedTab === 'produce', [s.produceNotSelect]: selectedTab !== 'produce'})}>
      <button onClick={() => setSelectedTab('produce')}>
        <Icon className={s.tabIcon} iconName={`notFoundVeg`} />
        {produceTabText}
      </button>
    </li>
  </ul>
);

HomeTabs.propTypes = {
  produceTabText: PropTypes.string,
  retailerTabText: PropTypes.string,
  selectedTab: PropTypes.string,
  setSelectedTab: PropTypes.func,
};

export default HomeTabs;
