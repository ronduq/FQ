import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import s from './TrendsViewBy.scss';

import InputTemplate from '../InputTemplate/InputTemplate';

const TrendsViewBy = ({title, setViewBy, showViewByDropdown, viewBy}) => {
  return (
    <div className={s.viewBy}>
        <p>{title}</p>
        { showViewByDropdown === true && 
          <InputTemplate label='View By' classname={classNames(s.customSelect, s.grey)}>
            <select value={viewBy} onChange={setViewBy}>
              {['weekly', 'monthly'].map(view => (
                <option key={`viewby-${view}`} value={view}>
                  {view}
                </option>
              ))}
            </select>
          </InputTemplate>
        }
      </div>
      )
};

TrendsViewBy.propTypes = {
  showViewByDropdown: PropTypes.bool,
  setViewBy: PropTypes.func,
  title: PropTypes.string,
  viewBy: PropTypes.string,
};

export default TrendsViewBy;
