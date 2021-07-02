import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import s from './Checkbox.module.scss';

class Checkbox extends React.Component {

  handleCheckboxChange = event => {
    const {
      updateItem,  
      index, 
      type, 
      selectAllItems, 
      parentCode, 
      isParent,
      currentRetailer,
      criteria
    } = this.props;

    this.setState({ checked: event.target.checked });
    if (type === 'all') {
      selectAllItems();
    } else {
      if (currentRetailer){
        updateItem(index, event.target.checked, parentCode, isParent,'',currentRetailer);
      } else {
        updateItem(index, event.target.checked, parentCode, isParent, criteria);
      }
      
    }
  }

  render() {
    const {
      label,
      type,
      selected,
      allNumber,
      name,
      disabled,
    } = this.props;

    return (
      <div className={classNames(s.checkbox,{ [s.checkboxChild]: type === 'child', [s.checkboxParent]: type === 'parent'})}>
        <input 
          type="checkbox" 
          id={`${label}${name}`} 
          checked={selected}
          onChange={this.handleCheckboxChange}
          disabled={disabled}
          autoComplete="off"
        />
        <label htmlFor={`${label}${name}`} aria-hidden="true"><span>{label}{ type === 'all' ? ` (${allNumber})` : ''}</span></label>
      </div>
    );
  }
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  type: PropTypes.string,
};

export default Checkbox;