import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import classNames from 'classnames';
import s from './AnalyteReading.scss';

const AnalyteReading = ({
  analyteId,
  produce,
  produceInfo,
  usdaTexts,
  content,
  retailerLabel
}) => {
  let label;
  let score;
  let recentScan;
  let usda;
  let status;
  let uom;

  Object.keys(get(produceInfo, ['info','analytes'], {})).map((analyte) => {
    const item = produceInfo.info.analytes[analyte];
    if(item.id === analyteId){
      label = item.label;
      score = item.score;
      recentScan = item.recentScan;
      usda = item.usda;
      status = item.status;
      uom = item.uom;
    }
  })

  const createAnalyteHtml = () => {
    return {__html: `${produce[analyteId]}`};
  }

  let atUsdaText = usdaTexts.green_text;
  let usdaTitle = usdaTexts.green_title;
  switch(status) {
    case 'Yellow':
      atUsdaText = usdaTexts.amber_text;
      usdaTitle = usdaTexts.amber_title;
    break;
    case 'Red':
      atUsdaText = usdaTexts.red_text;
      usdaTitle = usdaTexts.red_title;
    break;
  }

  const atTextReplaced = atUsdaText
    .replace("$analyte$", label)
    .replace("$produce$", produce.label)
    .replace("$retailer$", retailerLabel);
    
  return ( 
    <div className={s.container}>

      <ul className={s.readingMetrics}>
        <li><h3>{label} {content.reading}</h3></li>
        <li className={s.metric}><span className={s.metricTitle}>{content.score}</span> <span className={s.metricText}>{score}</span><span>{content.score_unit}</span></li>
        <li className={s.metric}><span className={s.metricTitle}>{content.scan}</span> <span className={s.metricText}>{recentScan}</span><span className={s.metricSuffix}>{uom}</span></li>
        <li className={s.metric}><span className={s.metricTitle}>{content.usda}</span> <span className={s.metricText}>{usda}</span><span className={s.metricSuffix}>{uom}</span></li>
      </ul>

      <div className={classNames(s.status,{[s.red]: status === 'Red', [s.amber]: status === 'Yellow'})}>
        <div className={s.statusLabel}>
          {usdaTitle}
        </div>
        <div className={s.statusText}>
          {atTextReplaced}
        </div>
      </div>

      <div>
        <h3>{produce.label} &amp; {label}</h3>
        {/* function createMarkup() { return {__html: 'First &middot; Second'}; }; */}
        <div className={s.analyteText} dangerouslySetInnerHTML={createAnalyteHtml()}></div> 
        
      </div>
    </div>
       
  );
};

AnalyteReading.propTypes = {
  analyteId: PropTypes.string,
  produce: PropTypes.shape(),
  produceInfo: PropTypes.shape(), 
  usdaTexts: PropTypes.shape(), 
  content: PropTypes.shape(), 
  retailerLabel: PropTypes.string,
};

AnalyteReading.defaultProps = {
  analyteId: '',
  produce: {},
  produceInfo: {},
  usdaTexts: {},
  content: {},
}

export default AnalyteReading;
