import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import moment from 'moment';
import Link from 'next/link';
import { generateQuerystring } from '../../utils'

import Icon from '../Icon/Icon';
import s from './TrendsLegend.scss';

const TrendsLegend = ({items, itemsLabels, pageType, sortBy, selectedDate, title, trendData, viewType, query, notAvailable}) => {
  const tableHeading  = sortBy === 'quality' ? 'Percentage' : 'Value';
  const format = viewType === 'weekly' ? 'MMM Do' : 'MMM';
  const formattedDate = moment(selectedDate).format(format);
  const { location, retailer } = query;
  const empryStr = notAvailable;

  let columnTitle = pageType === 'produce' ? 'Retailer' : 'Produce';

  let newItemsList;
  if (trendData) {
    newItemsList = Object.keys(trendData).map((trendItem, index) => {
      if (index > 0) {
        let selectedItem={};
        if (pageType === 'produce') {
          selectedItem = items.find(item => item.retailerCode === trendItem)
        } else { 
          selectedItem = items.find(item => item.produceCode === trendItem) 
        }
        return selectedItem;
      }
    });
    items.map(item => {
      const sameItem = newItemsList.find(newItem => newItem === item);
      if (!sameItem && !item.isParent) {
        newItemsList.push(item)
      }
    })
    newItemsList.shift();
  }

  const sortingItems = !newItemsList || newItemsList.length < 1 ? items : newItemsList; 

  return (
    <div className={s.trendslegend}>
      <h2>{title}</h2>
      <p className={s.date}>{formattedDate}</p>

      <table className={s.produceList}>
        <caption>{title}</caption>
        <thead>
          <tr>
            <th>{columnTitle}</th>
            <th colSpan="2">{tableHeading}</th>
          </tr>
        </thead>
        <tbody>
          { sortingItems.map((item, i) => {
            if (typeof item !== 'undefined') {
              const { id, isParent, selected, colour = '#02917F' } = item;
              
              if (isParent || !selected) return;

              const labelItem = get(itemsLabels, [id], '') ;
              const score = get(trendData, [id]) || empryStr;
              const scoreUnit = sortBy === 'quality' ? '%' : '';
              const scoreStr = score === empryStr ? score : `${score}${scoreUnit}`;

              let href, linkAs;
              if (pageType === 'retailer') {
                href = `/produce-profile?${generateQuerystring({...query, produce: id})}`;
                linkAs = `/${location}/produce/${id}/${retailer}`;
              }
              
              if (pageType === 'produce') {
                href = `/retailer-profile?${generateQuerystring({...query, retailer: id})}`;
                linkAs = `/${location}/retailers/${id}`;
              }

              return (
                <tr key={`legend-${id}`}>
                  <td>
                    <span className={s.dot}  style={{backgroundColor: colour}}/>
                    <Link href={href} as={linkAs} >
                      <a>{labelItem}</a>
                    </Link>
                  </td>
                  <td className={s.produceScore}>
                    {scoreStr}
                  </td>
                  <td className={s.arrowLink}>  
                    <Link href={href} as={linkAs} >
                      <a><Icon className={s.arrowRight} iconName={`chevron`} /></a>
                    </Link>
                  </td> 
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

TrendsLegend.propTypes = {
  items: PropTypes.array,
  itemsLabels: PropTypes.shape(),
  pageType: PropTypes.string,
  sortBy: PropTypes.string,
  selectedDate: PropTypes.number,
  title: PropTypes.string,
  trendData: PropTypes.shape(),
  viewType: PropTypes.string,
  query: PropTypes.shape(),
};

export default TrendsLegend;