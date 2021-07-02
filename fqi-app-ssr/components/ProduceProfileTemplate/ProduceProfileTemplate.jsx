import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './ProduceProfileTemplate.scss';
import layout from '../../hocs/Layout';
import AnalyteFilter from '../AnalyteFilter/AnalyteFilterContainer';
import ProduceDetails from '../ProduceDetails/ProduceDetailsContainer';
import LinkButton from '../../components/LinkButton/LinkButton';
import NotFoundDisplay from '../../components/NotFoundDisplay/NotFoundDisplay';
import { generateQuerystring } from '../../utils'

const ProduceProfileTemplate = ({
  retailersData,
  selectedRetailerId,
  produceInfo,
  producesData,
  content,
  query,
  buttonContent
}) => {
  const { location, produce } = query;
  return (
    <div className={classNames('container', s.produceProfile)}>
      <div className='layout layout--3-9 '>
        <div className='layout__column--1'>
          <ProduceDetails />
        </div>
        { Object.entries(produceInfo.info).length > 0 &&
          <div className='layout__column--2'>
            <section className={s.section}>
              <img className={s.logo} src={retailersData.itemsLogos[selectedRetailerId]} alt='' />
              <h1 className={s.title}>{producesData.itemsLabels[produceInfo.info.produceCode]}</h1>
              <p className={s.time}>{content.last_scan_on} {produceInfo.info.scanDate} {content.at} {produceInfo.info.scanTime}</p>
              <div className={s.link}>
                <LinkButton 
                  label={buttonContent.view_produce_trends}
                  as={`/${location}/produce/${produce}/trends`} 
                  href={`/produce-trends?${generateQuerystring(query)}`}
                />
              </div>
            </section>

            <section>
              <AnalyteFilter />
            </section> 
          </div>
        }
        { Object.entries(produceInfo.info).length == 0 &&
        <div className='layout__column--2'>
          <NotFoundDisplay 
            type='apple' 
            title={'notFoundScreens[`rank-table`].title'}
            text={'notFoundScreens[`rank-table`].text'} 
          />
          </div>
        }
      </div>
    </div>
  );
};

ProduceProfileTemplate.propTypes = {
};

ProduceProfileTemplate.defaultProps = {
};

export default layout(ProduceProfileTemplate);