import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './ProduceBasketCard.scss';

const ProduceBasketCard = ({items, itemsImages, itemsLabels, updateProduce}) => (
  <div className={s.basketCard}>
    <ul className={classNames('layout', 'layout--3-3-3')}>
      {items.map(({isParent, parentCode, produceCode, selected}, index) => {
        if (isParent) return null;
        return (
        <li className={classNames('layout__column--1', {[s.selected]: selected })} key={`basket${produceCode}`}>
          <button onClick={() => updateProduce(index, !selected, parentCode)}>
            { selected && <span className={s.checkmark} /> }
            <img src={itemsImages[produceCode]} />
            <p className={s.produceLabel}>{itemsLabels[produceCode]}</p>
          </button>
        </li>)
      })}
    </ul>
  </div>
);
  
ProduceBasketCard.propTypes = {
  items: PropTypes.array,
  itemsImages: PropTypes.shape(),
  itemsLabels: PropTypes.shape(),
  updateProduce: PropTypes.func,
};


export default ProduceBasketCard;