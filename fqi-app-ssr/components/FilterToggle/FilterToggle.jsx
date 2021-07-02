import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

import s from './FilterToggle.scss';

const FilterToggle = ({ children, viewport }) => {
  const isTwoColumn = viewport === 'xlarge';
  const [showHide, setShowHide] = useState(false);
  const handleToggle = () => setShowHide(!showHide);

  useEffect(() => {
    setShowHide(isTwoColumn);
  }, [viewport]);

  return (
    <div className={s.filterToggle}>
      { !isTwoColumn && 
        <button onClick={handleToggle} aria-haspopup="true" aria-controls="FilterMenu" aria-expanded={showHide} aria-label="Toggle Filters">
          {!showHide && <Icon iconName="mobileFilter" className={s.toggleIcon}/>}
          {showHide && <span className={s.close}></span>}
        </button>
      }
      <div id="FilterMenu" className={classNames({[s.twoColumn]: !isTwoColumn, [s.showFilters]: !isTwoColumn && showHide }) }>
        { (isTwoColumn || (!isTwoColumn && showHide)) && children}
      </div>
    </div>
  )
}

FilterToggle.propTypes = {
  children: PropTypes.node,
  viewport: PropTypes.string,
};

export default FilterToggle;