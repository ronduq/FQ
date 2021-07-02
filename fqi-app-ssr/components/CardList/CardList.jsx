import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import classNames from 'classnames';
import Card from '../Card/CardContainer';
import s from './CardList.scss';


const CardList = ({
  retailerProduces,
  selectedRetailerId,
  retailersData,
  producesData,
}) => {
  return (
    <ul className={classNames('layout', 'layout--3-3-3', s.cardContainer)}>
      {Object.keys(get(retailerProduces, 'items', '')).map((retailerProduce, index) => {
        while (index < 3){
          return (
            <li className='layout__column--1' key={`card${index}`}>
              <Card 
                produce={retailerProduces.items[retailerProduce]} 
                retailerId={selectedRetailerId}
                logo={retailersData.itemsLogos[selectedRetailerId]}
                name={producesData.itemsLabels[retailerProduces.items[retailerProduce].produceCode]}
                image={producesData.itemsImages[retailerProduces.items[retailerProduce].produceCode]}
              />
            </li>
          )
        }
      })}
    </ul>
  );
};

CardList.propTypes = {
  retailerProduces: PropTypes.shape(),
  selectedRetailerId: PropTypes.string,
  retailersData: PropTypes.shape(),
  producesData: PropTypes.shape(),
};

CardList.defaultProps = {
  retailerProduces: {},
  selectedRetailerId: '',
  retailersData: {},
  producesData: {},

};

export default CardList;
