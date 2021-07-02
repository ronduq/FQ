import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Table from '../Table/Table';
import Tooltip from '../../hocs/TooltipContainer';
import NotFoundDisplay from '../NotFoundDisplay/NotFoundDisplay';
import get from 'lodash.get';

import InputTemplate from '../InputTemplate/InputTemplate';

import s from './TableFilter.scss';

class TableFilter extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { producesData, tableInfo } = this.props;
    const indexProd = Object.keys(producesData.items).find(produce => !producesData.items[produce].isParent);
    const initProd = producesData.items[indexProd].id;
    if (Object.keys(tableInfo).length === 0)  {
      this.props.setProduceInfoTable(initProd, producesData.itemsLabels[initProd]);
    }
  }
  
  handleClick (produce) {
    const { updateProduce, producesData } = this.props;
    updateProduce(0, true, 'parentCode', false, produce);
    this.props.setProduceInfoTable(produce, producesData.itemsLabels[produce]);
  }

  handleChange (event) {
    const produce = event.target.value;
    this.handleClick(produce);
  }

  render (){
    const {
      producesData, 
      retailerRanksData, 
      retailersData,
      selectedLocation,
      sortRanks,
      viewport,
      tableInfo,
      notFoundScreens,
      retailerProduces,
      content,
    } = this.props;
    const highlight =  get(tableInfo,['produce'],'');
    const title =  get(tableInfo,['title'],'');

      return (
        <div className={s.container}>
          <div className={s.title}>
            <Tooltip 
              side='right' 
              size='large'
              bubblePosition='right'
              id='all_produce_title'
            >
              <h3>{content.table_title}</h3>
            </Tooltip>  
          </div>  
          <div className={s.body}>
            {viewport !== 'mobile' &&
            <ul className={s.filter} id={`tableFilterButton`}>
              { Object.keys(producesData.items).map((prod, index) => {
                const produce = producesData.items[prod];
                if (produce.selected && !produce.isParent) {
                  return (
                  <li id={`test${index}`} key={`tableFilterListItem-${index}`} className={classNames({[s.highlight] : produce.id === highlight })}>
                    <button className={s.filterButton} onClick={() => this.handleClick(produce.id)}>{producesData.itemsLabels[produce.id]}</button>
                  </li>
                  )
                }
              })}
            </ul> }
            { viewport === 'mobile' &&
              <div className={s.dropdownContainer}>
                <label className={s.dropdownLabel} htmlFor="produceList">{content.table_mobile_title}</label>
                <select className={s.dropdown} id="produceList" name="select" onChange={this.handleChange}>
                { Object.keys(producesData.items).map((prod, index) => {
                    const produce = producesData.items[prod];
                    if (produce.selected && !produce.isParent) {
                      return (
                      <option key={`tableFilterListItem-${index}`} value={produce.id}>
                        {producesData.itemsLabels[produce.id]}
                      </option>
                      )
                    }
                  })}
                </select> 
              </div>
            }  

            <div className={s.content}>
              <h3 className={s.contentTitle}>{title}</h3>
              { Object.keys(retailerProduces.items).filter(item => retailerProduces.items[item].produceCode === highlight).length > 0 &&
                <Table 
                  retailersData={retailersData} 
                  sortRanks={sortRanks} 
                  noBorders={true}
                  labels={retailerRanksData.labels}
                  selected={retailerRanksData.selected}
                  direction= {retailerRanksData.direction}
                  ranks={retailerRanksData.ranksSingle}
                  type='single'
                  location={selectedLocation}
                  produceId={highlight}
                />
              }
              { Object.keys(retailerProduces.items).filter(item => retailerProduces.items[item].produceCode === highlight).length == 0 &&
                <div className={s.notFoundDisplayContainer}>
                  <NotFoundDisplay 
                    type='notFoundVeg' 
                    title={notFoundScreens[`retailer_produce`].title}
                    text={notFoundScreens[`retailer_produce`].text} 
                  />
                </div>
              }
            </div>
          </div>
        </div>
      )}
};

TableFilter.propTypes = {
  producesData: PropTypes.shape(), 
  retailerRanksData: PropTypes.shape(), 
  retailersData: PropTypes.shape(), 
  sortRanks: PropTypes.func,
  selectedLocation: PropTypes.string,
  viewport: PropTypes.string,
  tableInfo: PropTypes.shape(),
};

TableFilter.defaultProps = {
  producesData: {}, 
  retailerRanksData: {}, 
  retailersData: {}, 
  sortRanks: () => {}, 
  viewport: '',
  tableInfo: {},
};

export default TableFilter;
