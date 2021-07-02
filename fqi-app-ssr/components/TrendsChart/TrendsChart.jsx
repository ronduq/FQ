import React from 'react';
import PropTypes from 'prop-types';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import moment from 'moment';

import CustomizedTimeline from '../CustomizedTimeline/CustomizedTimeline'

import s from './TrendsChart.scss';

const TrendsChart = ({data, handleSetDate, items, selectedDate, viewport, viewType, compareBy}) => {

  const formatXAxis = time => {
    const format = viewType === 'weekly' ? 'MMM D' : 'MMM';
    return moment(time).format(format);
  }

  const isViewportLarge = ['large', 'xlarge'].includes(viewport);
  const mobileOffsetLeft = !isViewportLarge ? -30 : 0;

  return (
    <div className={s.chart} aria-label="Produce trends chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 15, left: mobileOffsetLeft, bottom: 0 }} onClick={handleSetDate}>  
          <CartesianGrid strokeDasharray="2 6" fill="#F2F9F8"/>

          {items.map((item, i)  => {
            const { id, isParent, selected, colour = '#02917F' } = item;
            if (isParent || !selected) return;
            return <Line 
              isAnimationActive={true} 
              key={`line-${id}-${i}`} 
              activeDot={{ stroke: colour, fill: 'white', strokeWidth: 2, r: 5 }} 
              dot={{ stroke: colour, fill: colour, strokeWidth: 2, r: 5 }} 
              strokeWidth={2} 
              stroke={colour} 
              type="linear" 
              dataKey={id} 
            />
          })}
          
          <Tooltip content={<></>} />

          <XAxis dataKey="timestamp" width={10} tickFormatter={formatXAxis} domain={['auto', 'auto']}/>
          <YAxis domain={['auto', 'auto']} reversed={compareBy === 'quality' ? false : true }/>

          <ReferenceLine isFront={true} x={selectedDate}  label={<CustomizedTimeline />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

TrendsChart.propTypes = {
  data: PropTypes.array,
  handleSetDate: PropTypes.func,
  items: PropTypes.array,
  selectedDate: PropTypes.number,
  viewport: PropTypes.string,
  viewType: PropTypes.string,
};

TrendsChart.defaultProps = {
  viewType: 'weekly'
};

export default TrendsChart;




