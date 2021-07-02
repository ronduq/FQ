import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link'

import s from './ProduceBasketTemplate.scss';
import layout from '../../hocs/Layout';
import Icon from '../Icon/Icon';
import ProduceBasketCard from '../ProduceBasketCard/ProduceBasketCard';
import ProduceBasket from '../ProduceBasket/ProduceBasket';
import Tooltip from '../../hocs/TooltipContainer';

import Checkbox from '../Checkbox/Checkbox';

const ProduceBasketTemplate = ({
  allSelected,
  count,
  content,
  items,
  images,
  labels,
  selectAllProduces,
  selectedLocation,
  updateProduce,
  viewport
}) => {
  const { label: selectedLocationLabel, id: locationId } = selectedLocation;
  const { basket_heading, continue_button, intro, location_title, select_all_button, title } = content;
  const introReplace = intro.replace("$location$", selectedLocationLabel);

  return (
    <div className={classNames('container', s.produceBasket)}>
      <div className='layout layout--3-9'>
        
        <div className='layout__column--2'>
          <div className={s.intro}>
            <Icon className={s.basketIcon} iconName={`basket`} />
            <div>
              <h1>{title}</h1>
              <p>{introReplace}</p>
            </div>
          </div>
          
          <div className={s.produceCards} > 
            <Tooltip 
              side='right' 
              size='large'
              bubblePosition='right'
              id='produce_basket_title'
            >
              <h2 className={s.locationTitle}>{location_title} {selectedLocationLabel}</h2>
            </Tooltip>
            <Checkbox 
                label={select_all_button}
                selected={allSelected} 
                type='all'
                allNumber = {count || items.length}
                selectAllItems={selectAllProduces}
                name={'produce'}
              />
          </div>
          
          <ProduceBasketCard 
            items={items} 
            itemsImages={images} 
            itemsLabels={labels}
            updateProduce={updateProduce}
          />
          
        </div>
        <div className={classNames('layout__column--1', s.basketWrapper)}>
          <div className={s.basket}>
            { viewport === 'xlarge' && 
              <ProduceBasket 
                locationLabel={selectedLocationLabel}
                items={items} 
                itemsImages={images} 
                itemsLabels={labels} 
                title={basket_heading}
                updateProduce={updateProduce}
              />
             }

            <Link href={`/best-picks?location=${locationId}`} as={`/${locationId}/produce/best-picks`}>
              <a className={s.continueButton}>{continue_button}</a>
            </Link>
          </div>
        
          
        </div>
      </div>
    </div>
  );
};

ProduceBasketTemplate.propTypes = {
  allSelected: PropTypes.bool,
  content: PropTypes.shape(),
  count: PropTypes.number,
  items: PropTypes.array,
  images: PropTypes.shape(),
  labels: PropTypes.shape(),
  selectAllProduces: PropTypes.func,
  selectedLocation: PropTypes.shape(),
  updateProduce: PropTypes.func,
  viewport: PropTypes.string,
};

ProduceBasketTemplate.defaultProps = {
  items: [], 
  itemsImages:  {}, 
  itemsLabels: {}
};

export default layout(ProduceBasketTemplate);