import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import RadioButton from '../../components/RadioButton/RadioButton';
import t from '../Icon/Icon.module.scss';
import s from './CompareByFilter.module.scss';
import get from 'lodash.get';


const CompareByFilter = ({sortRanks, selected, showPerception, content}) => {
  const radioGroup="compareBy"
  return (
    <fieldset className={s.container}>
      <legend>{get(content,'compare')}</legend>
      <RadioButton radioGroup={radioGroup} label={get(content,'quality')} id='quality' changeAction={sortRanks} selected={selected === 'quality'}/>
      <RadioButton radioGroup={radioGroup} label={get(content,'value')} id='value' changeAction={sortRanks} selected={selected === 'value'}/>
      { showPerception && 
        <RadioButton radioGroup={radioGroup} label={get(content,'perception')} id='perception' changeAction={sortRanks} selected={selected === 'perception'}/> }
    </fieldset>
  );
};

CompareByFilter.defaultProps = {
  showPerception: true
};

CompareByFilter.propTypes = {
};

export default CompareByFilter;
