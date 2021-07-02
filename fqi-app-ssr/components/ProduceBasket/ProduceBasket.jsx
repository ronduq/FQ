import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon/Icon';

import s from './ProduceBasket.scss';

const ProduceBasket = ({locationLabel, items, itemsImages, itemsLabels, title, updateProduce}) => (
  <div className={s.produceBasket}>

    <div className={s.basketHeader}>
      <div className={s.title}>
        <Icon className={s.basketIcon} iconName={`basket`} />
        <p>{title}</p>
      </div>
      <p className={s.location}>{locationLabel}</p>
    </div>
    
    <ul className={s.basketItems}>
      {items.map(({isParent, parentCode, produceCode, selected}, index) => {
        if (!selected || isParent) return null;
        return (
        <li key={`basket-${produceCode}`}>
          <img src={itemsImages[produceCode]} />
          <p className={s.produceLabel}>{itemsLabels[produceCode]}</p>
          <button onClick={() => updateProduce(index, false, parentCode)}>
            <span>Close</span>
            <Icon className={s.closeIcon} iconName={`basketClose`} />
          </button>
          
        </li>)
      })}
    </ul>
  </div>
);
  
ProduceBasket.propTypes = {
  locationLabel:  PropTypes.string,
  items: PropTypes.array,
  itemsImages: PropTypes.shape(),
  itemsLabels: PropTypes.shape(),
  title: PropTypes.string,
  updateProduce: PropTypes.func,
};


export default ProduceBasket;