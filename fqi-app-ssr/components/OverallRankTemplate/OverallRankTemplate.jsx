import React from 'react';
import classNames from 'classnames';
import CollapseableFilter from '../../components/CollapseableFilter/CollapseableFilter'
import Table from '../../components/Table/Table'

import CompareByFilter from '../../components/CompareByFilter/CompareByFilter';
import NotFoundDisplay from '../../components/NotFoundDisplay/NotFoundDisplay';
import FilterToggle from '../FilterToggle/FilterToggleContainer';
import layout from '../../hocs/Layout';
import Tooltip from '../../hocs/TooltipContainer';
import SharePage from '../SharePage/SharePageContainer'

import s from './OverallRankTemplate.module.scss';

const OverallRankPage = ({
  retailersData,
  updateRetailer,
  selectAllRetailers,
  producesData,
  pageId,
  updateProduce,
  selectAllProduces,
  retailerRanksData,
  sortRanks,
  selectedLocation,
  notFoundScreens,
  viewport,
  filtersContent,
  content
}) => {
  const nothingSelected = () => {
    if (Object.entries(retailerRanksData.ranks).length > 0) {
      return false;
    }
    return true;
  }

  const showSharePage = (show) => show && <SharePage 
    compareBy={retailerRanksData.selected}
    id={pageId} 
    includeProduces
    includeRetailers
    viewport={viewport}
  />
  
  return (
    <div className={classNames('container', s.overallRank)}>
      <div className='layout layout--3-9 '>
        <div className='layout__column--1'>
          <FilterToggle>
            <div className={s.filterTitle}>{filtersContent.main_title}</div>
            <CompareByFilter sortRanks={sortRanks} selected={retailerRanksData.selected} content={filtersContent}/>
            <div className={s.filterContainer}>
              <CollapseableFilter 
                data={retailersData}
                updateItem={updateRetailer}
                selectAllItems={selectAllRetailers}
                title={filtersContent.retailers}
              />
              <CollapseableFilter 
                data={producesData}
                updateItem={updateProduce}
                selectAllItems={selectAllProduces}
                title={filtersContent.produce}
              />
            </div>
          </FilterToggle>
        </div>
        <div className='layout__column--2'>
          <div className={s.columnHeader} >
            <Tooltip 
              side='right' 
              size='large'
              bubblePosition='right'
              id='overallrank_title'
            >
              <h1 className={s.pageTitle}>{content.table_title} {selectedLocation.label}</h1>
            </Tooltip>
            {showSharePage(viewport === 'xlarge')}
            {content.table_subtitle &&
              <p className={s.pageSubtitle}>{content.table_subtitle}</p>
            }
          </div>
          
          { !nothingSelected() &&
            <Table 
              retailersData={retailersData} 
              sortRanks={sortRanks}
              labels={retailerRanksData.labels}
              selected={retailerRanksData.selected}
              direction= {retailerRanksData.direction}
              ranks={retailerRanksData.ranks}
              location={selectedLocation.id}
            />
          } 
          { nothingSelected() &&
            <NotFoundDisplay 
              type='apple' 
              title={notFoundScreens[`rank-table`].title}
              text={notFoundScreens[`rank-table`].text} 
            />
          } 

          {showSharePage(viewport !== 'xlarge')}
        </div>
      </div>
    </div>
  );
};

export default layout(OverallRankPage);
