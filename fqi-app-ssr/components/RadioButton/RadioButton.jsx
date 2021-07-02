import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import s from './RadioButton.module.scss';

class RadioButton extends React.Component {

  handleRadioButtonChange = (event) => {
    const {
      changeAction
    } = this.props;
    const criteria = event.target.value;
    if (criteria === 'quality'){
      changeAction(criteria, 'topToBottom');
    } else {
      changeAction(criteria, 'bottomToTop');
    }
  }

  render() {
    const {
      label,
      selected,
      id,
      radioGroup

    } = this.props;

    return (
      <div className={s.radio}>
        <input 
          type="radio" 
          id={id} 
          name={radioGroup}
          value={id} 
          onChange={this.handleRadioButtonChange}
          checked={selected}
          tabIndex='0'
          autoComplete="off"
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
};

RadioButton.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  type: PropTypes.string,
  radioGroup: PropTypes.string,
};

export default RadioButton;