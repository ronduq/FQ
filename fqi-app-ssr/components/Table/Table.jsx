import React from 'react';
import classNames from 'classnames';
import get from 'lodash.get';
import LinkButton from '../../components/LinkButton/LinkButton';
import Icon from '../Icon/Icon';
import Tooltip from '../../hocs/TooltipContainer';
import s from './Table.module.scss';
import t from '../Icon/Icon.module.scss';

const Table = ({
  sortRanks, 
  retailersData, 
  noBorders, 
  labels, 
  selected, 
  direction, 
  ranks, 
  type, 
  produceId, 
  location,
}) => {
  const selectedCriteria = selected;
  const categories = {
    quality: {
      criteria: 'quality',
      id: 'tableHeaderQualityButton',
      firstOrder: 'bottomToTop',
      secondOrder: 'topToBottom',
      champion: 'qualityChampion',
    },
    value: {
      criteria: 'value',
      id: 'tableHeaderValueButton',
      firstOrder: 'topToBottom',
      secondOrder: 'bottomToTop',
      champion: 'valueChampion',
    },
    perception: {
      criteria: 'perception',
      id: 'tableHeaderPerceptionButton',
      firstOrder: 'topToBottom',
      secondOrder: 'bottomToTop',
      champion: 'perceptionChampion',
    },
  }

  const selectCriteria = (criteria) => {
    const selectedCriteria = selected;
    if (selectedCriteria === criteria && direction === 'topToBottom') {
      sortRanks(criteria, 'bottomToTop', type);
    } else if (selectedCriteria === criteria && direction === 'bottomToTop') {
      sortRanks(criteria, 'topToBottom', type);
    } else {
      if (criteria === 'quality'){
        sortRanks(criteria, 'topToBottom', type);
      } else {
        sortRanks(criteria, 'bottomToTop', type);
      }
    }
  }

  return (
    <table className={classNames(s.table, { [s.noBorders]: noBorders})}  role="grid" aria-readonly="true">
      <caption>Retailers table sorted by {selectedCriteria}, {direction === 'topToBottom' && <span>ascending</span>} {direction === 'bottomToTop' && <span>descending </span>} </caption>
      <thead>
        <tr className={s.headerRow}>
          <th className={classNames(s.tableHeader, s.cell)} scope="col">{labels.retailer}</th>
          {categories && Object.keys(categories).map((category, index) => {
            return (
              <th 
                className={classNames(s.tableHeader, s.cell, s.filterButton,{[s.cellHighlight] : selectedCriteria === categories[category].criteria})} 
                scope="col" 
                id={categories[category].id}
                key={index}
              >
                <Tooltip 
                  side='left' 
                  size='small'
                  bubblePosition='left'
                  id={categories[category].criteria}
                >
                <button onClick={() => { selectCriteria(categories[category].criteria)} } >
                  {labels[category]}
                  <div className={s.arrowsContainer}>
                    {(selectedCriteria !== categories[category].criteria ||
                    (selectedCriteria === categories[category].criteria && direction !== categories[category].secondOrder)) && (
                      <span className={classNames(s.arrow, s.arrowUp)}>
                        <Icon className={classNames(t.iconXSmall, t.iconBlack)} iconName={`chevron`} />
                      </span>
                    )}
                    {(selectedCriteria !== categories[category].criteria ||
                    (selectedCriteria === categories[category].criteria && direction !== categories[category].firstOrder)) && (
                      <span className={classNames(s.arrow, s.arrowDown)}>
                        <Icon className={classNames(t.iconXSmall, t.iconBlack)} iconName={`chevron`} />
                      </span>
                    )}
                  </div>
                </button>
                </Tooltip>
                
              </th>
            )
          })}
          <th></th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(ranks).map((item,index) => {
          const retailer = ranks[item];
          const { retailerCode } = retailer;

          let linkHref = `/retailer-profile?location=${location}&retailer=${retailerCode}`;
          let linkAs = `/${location}/retailers/${retailerCode}`
          let buttonLabel = labels.button_label;

          if (produceId) {
            linkHref = `/produce-profile?location=${location}&produce=${produceId}&retailer=${retailerCode}`
            linkAs = `/${location}/produce/${produceId}/${retailerCode}/`
            buttonLabel = labels.produce_button_label;
          }

          return (
            <tr className={s.bodyRow} key={index}>
              <td 
                className={classNames(s.cell, s.cellImage)}
                data-title={labels.retailer}
              >
                <img className={s.logo} src={`${get(retailersData.itemsLogos,[retailerCode])}`} alt={retailerCode}/>
              </td>
              {Object.keys(categories).map((category,idx) => {
                return(
                  <td 
                    className={classNames(
                      s.largeText, 
                      s.cell, 
                      {[s.cellHighlight] : selectedCriteria === categories[category].criteria},
                      {[s.cellChampion] : retailer[categories[category].champion]},
                    )}
                    data-title={labels[categories[category].criteria]}
                    key={idx}
                  >
                    {retailer[categories[category].criteria]}{(categories[category].criteria === 'quality') && <span>%</span>} {
                    retailer[categories[category].champion] && 
                    (<Icon className={classNames(t.iconLarge, t.iconTeal, s.iconRosette)} iconName={`rosette`} aria-hidden={true}/>)} 
                  </td>
                )
              })}
              
              <td className={classNames(s.largeText, s.cell)}>
                <LinkButton label={buttonLabel} href={linkHref} as={linkAs} />
              </td>
            </tr>
          )
        })}
        
      </tbody>

    </table>
  )}


export default Table;