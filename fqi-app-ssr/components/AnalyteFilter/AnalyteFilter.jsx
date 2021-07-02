import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import classNames from 'classnames';
import AnalyteReading from '../AnalyteReading/AnalyteReadingContainer';
import Tooltip from '../../hocs/TooltipContainer';

import s from '../TableFilter/TableFilter.scss';

class AnalyteFilter extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      highlight: 'water',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { produceInfo } = this.props;
    this.setState({
      highlight: get(produceInfo,['info','analytes'],[{}])[0].id,
    });
  }
  
  handleClick (analyte) {
    this.setState({
      highlight: analyte.id,
    });
  }

  handleChange (event) {
    const prod = event.target.value;
    const { produceInfo } = this.props;
    this.handleClick(produceInfo.info.analytes[prod]);
  }

  render (){
    const {
      produceInfo, 
      viewport,
      producesData,
      content,
    } = this.props;
    let selectedProduceInfo = {}

    Object.keys(get(producesData, 'itemsInfo')).map(prod => {
      if (producesData.itemsInfo[prod].id === get(produceInfo.info,'produceCode')) {
        selectedProduceInfo = producesData.itemsInfo[prod]
      }
    })

      return (
        <div className={s.container}>
          <div className={s.title}>
            <Tooltip 
              side='right' 
              size='large'
              bubblePosition='right'
              id='analyte_filter_title'
            >
              <h3>{content.analyte_breakdown}</h3>
            </Tooltip>
          </div>  
          <div className={s.body}>
            {viewport !== 'mobile' &&
            <ul className={s.filter} >
              { Object.entries(produceInfo.info).length > 0 &&
                Object.keys(get(produceInfo, ['info','analytes'])).map((prod, index) => {
                const analyte = produceInfo.info.analytes[prod];
                return (
                  <li 
                    id={`AnalyteFilterListItem${index}`} 
                    key={`AnalyteFilterListItem-${index}`} 
                    className={classNames({[s.highlight] : analyte.id === this.state.highlight })}
                  >
                    <button 
                      className={s.filterButton} 
                      onClick={() => this.handleClick(analyte)}
                    >
                      {analyte.label} <span className={s.buttonInfo}>{analyte.score}%</span>
                    </button>
                  </li>
                )
              })}
            </ul> }
            { viewport === 'mobile' &&
              Object.entries(produceInfo.info).length > 0 &&
              <div className={s.dropdownContainer}>
                <label className={s.dropdownLabel} htmlFor="produceList">{content.analytes}</label>
                <select className={s.dropdown} id="produceList" name="select" onChange={this.handleChange}>
                { Object.keys(get(produceInfo, 'info.analytes')).map((prod, index) => {
                    const analyte = produceInfo.info.analytes[prod];
                      return (
                      <option key={`AnalyteFilterListItem-${index}`} value={prod}>
                         {analyte.label}
                      </option>
                      )
                  })}
                </select> 
              </div>
            }  

            <div className={s.content}>
              <AnalyteReading 
                analyteId={this.state.highlight}
                produce={selectedProduceInfo}
              />
            </div>
          </div>
        </div>
      )}
};

AnalyteFilter.propTypes = {
  produceInfo: PropTypes.shape(), 
  producesData: PropTypes.shape(), 
  viewport: PropTypes.string,
};

AnalyteFilter.defaultProps = {
  produceInfo: {},
  producesData: {}, 
  viewport: '',
};

export default AnalyteFilter;
