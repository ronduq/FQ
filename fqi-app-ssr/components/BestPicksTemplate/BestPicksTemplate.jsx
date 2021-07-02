import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash.get';
import s from './BestPicksTemplate.scss';
import layout from '../../hocs/Layout';
import FilterToggle from '../FilterToggle/FilterToggleContainer';
import BestPicksFilters from '../BestPicksFilters/BestPicksFiltersContainer';
import MatchCard from '../MatchCard/MatchCardContainer';
import Card from '../Card/CardContainer';
import Tooltip from '../../hocs/TooltipContainer';
import SharePage from '../SharePage/SharePageContainer';
import NotFoundDisplay from '../NotFoundDisplay/NotFoundDisplay';

const BestPicksTemplate = ({
  content,
  selectedLocation,
  bestPicks,
  retailersData,
  pageId,
  producesData,
  viewport,
  notFoundContent
}) => {
  const { label: selectedLocationLabel } = selectedLocation;
  const topPicks = get(bestPicks,'topPicks', [])
  const retailerBestPicks = get(bestPicks,'retailerTopPicks[0]');
  const retailerSecondBestPicks = get(bestPicks,'retailerTopPicks[1]');
  const { criteria } =  bestPicks;

  const showSharePage = (show) => show && <SharePage 
    compareBy={criteria}
    id={pageId} 
    includeProduces
    includeRetailers
    viewport={viewport}
  />

  return (
    <div className={classNames('container', s.bestPicks)}>
      <div className='layout layout--3-9 '>
        <div className='layout__column--1'>
          <FilterToggle>
            <BestPicksFilters criteria={criteria}/>
          </FilterToggle>
        </div>
        <div className='layout__column--2'>
          <section>
            
            <div className={s.columnHeader} >
              <Tooltip 
                side='right' 
                size='large'
                bubblePosition='right'
                id='best_picks_title'
              >
                <h2 className={classNames(s.pageTitle, s.highlights)}>{content.best_picks_in} {selectedLocationLabel}</h2>
              </Tooltip>

              {showSharePage(viewport === 'xlarge')}
              {content.subtitle &&
                <p className={s.pageSubtitle}>{content.subtitle}</p>
              }
            </div>

            {topPicks.length === 0 &&
              <NotFoundDisplay 
                type='apple' 
                title={notFoundContent.title}
                text={notFoundContent.text} 
              />
            }

            <ul className={classNames('layout', 'layout--3-3-3', s.cardContainer)}>
              {Object.keys(topPicks).map((card,index) => {
                const retailerId = bestPicks.topPicks[card].retailerCode;
                const produceId = bestPicks.topPicks[card].produceCode;
                while (index < 3) {
                  return (
                    <li className='layout__column--1' key={`bpcard${index}`}>
                      <Card 
                        produce={bestPicks.topPicks[card]} 
                        retailerId={retailerId}
                        logo={retailersData.itemsLogos[retailerId]}
                        name={producesData.itemsLabels[produceId]}
                        image={producesData.itemsImages[produceId]}
                      />
                    </li>
                  )
                }
              }
              )}
            </ul>  
          </section>
          {topPicks.length > 0 &&
            <section>
              <Tooltip 
                side='right' 
                size='large'
                bubblePosition='right'
                id='best_store_title'
              >
                <h2 className={classNames(s.pageTitle, s.highlights)}>{content.best_store_match}</h2>
              </Tooltip>
              <ul className={classNames('layout', 'layout--3-3-3', s.cardContainer)}>
                <li className='layout__column--1'>
                  <MatchCard 
                    id='best_store' 
                    retailerId={get(retailerBestPicks, 'retailerCode', '')} 
                    score={get(retailerBestPicks, 'score', '')}
                    type={bestPicks.criteria}
                    valueRankText='1'
                    isSameRankValue={get(retailerBestPicks, 'isSameRankValue')}
                  />
                </li>
                {Object.keys(get(retailerBestPicks, 'topPicks', '')).map( (card,index) => {
                  const retailerId = retailerBestPicks.retailerCode;
                  const produceId = retailerBestPicks.topPicks[card].produceCode;
                  while (index < 2) {
                    return (
                      <li className='layout__column--1' key={`bpcard${index}`}>
                        <Card 
                          produce={retailerBestPicks.topPicks[card]} 
                          retailerId={retailerId}
                          logo={retailersData.itemsLogos[retailerId]}
                          name={producesData.itemsLabels[produceId]}
                          image={producesData.itemsImages[produceId]}
                        />
                      </li>
                    )
                  }
                }
                )}
              </ul>  
            </section>
          }
          { topPicks.length > 0 && retailerSecondBestPicks &&
          <section>
            <Tooltip 
              side='right' 
              size='large'
              bubblePosition='right'
              id='second_best_store_title'
            >
              <h2 className={classNames(s.pageTitle, s.highlights)}>{content.next_best_store_match}</h2>
            </Tooltip>
            <ul className={classNames('layout', 'layout--3-3-3', s.cardContainer)}>
              <li className='layout__column--1'>
                <MatchCard 
                  id='next_best_store' 
                  retailerId={get(retailerSecondBestPicks, 'retailerCode', '')} 
                  score={get(retailerSecondBestPicks, 'score', '')}
                  type={bestPicks.criteria}
                  valueRankText={retailerSecondBestPicks.isSameRankValue ? '1' : '2'}
                  isSameRankValue={get(retailerSecondBestPicks, 'isSameRankValue')}
                />
              </li>
              {Object.keys(get(retailerSecondBestPicks, 'topPicks', '')).map( (card,index) => {
                const retailerId = retailerSecondBestPicks.retailerCode;
                const produceId = retailerSecondBestPicks.topPicks[card].produceCode;
                while (index < 2) {
                  return (
                    <li className='layout__column--1' key={`bpcard${index}`}>
                      <Card 
                        produce={retailerSecondBestPicks.topPicks[card]} 
                        retailerId={retailerId}
                        logo={retailersData.itemsLogos[retailerId]}
                        name={producesData.itemsLabels[produceId]}
                        image={producesData.itemsImages[produceId]}
                      />
                    </li>
                  )
                }
              }
              )}
            </ul>  

            {showSharePage(viewport !== 'xlarge')}
          </section>
          }
        </div>
      </div>
    </div>
  );
};

BestPicksTemplate.propTypes = {
  content: PropTypes.shape(),
  notFoundContent: PropTypes.shape(),
  pageId: PropTypes.string,
  retailersLabels: PropTypes.shape(),
  selectedLocation: PropTypes.shape(),
  selectedRetailer: PropTypes.string,
  query: PropTypes.shape(),
  viewport: PropTypes.string,
};

BestPicksTemplate.defaultProps = {
  content: {
    retailer_highlights_title: 'Retailer Highlights',
  },
  selectedLocation: {
    id: '',
    label: ''
  },
  query: {
    retailer: ''
  }
};

export default layout(BestPicksTemplate);