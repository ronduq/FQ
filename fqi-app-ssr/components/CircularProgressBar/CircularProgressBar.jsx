import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import s from './CircularProgressBar.scss';
  const CircularProgressBar = ({sqSize, strokeWidth, percentage, text, type, value, maxValue,valueRankText}) => {
    // Size of the enclosing square
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    let newPercentage = percentage;
    let circlePercentage = newPercentage < 101 ? newPercentage : 100;
    if (type === 'value') { newPercentage = 100}
    const dashOffset = type === 'value' ? 0 : dashArray - dashArray * circlePercentage / 100;
    const valueText = valueRankText === '1' ? '1' : '2';
    const valueSuffix = valueRankText === '1' ? 'st' : 'nd';

    return (
      <svg
          width={sqSize}
          height={sqSize}
          viewBox={viewBox}>
          <circle
            className={s.circleBackground}
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`} />
          <circle
            className={s.circleProgress}
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }} />
          <text
            className={s.circleNumber}
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle">
            {type === 'value' ? `${valueText}` : `${newPercentage}%`}
          </text>
          {type === 'value' &&
            <text
              className={classNames(s.circleNumberSuffix,{[s.circleNumberSuffixFirst]: valueRankText === '1'})}
              x="62%"
              y="43%"
              dy=".3em"
              textAnchor="middle">
              {`${valueSuffix}`}
            </text>
          }
          <text
            className={s.circleText}
            x="50%"
            y="68%"
            dy=".3em"
            textAnchor="middle">
            {text}
          </text>
      </svg>
    );
}

CircularProgressBar.propTypes = {
  sqSize: PropTypes.number,
  strokeWidth: PropTypes.number,
  text: PropTypes.string,
};

CircularProgressBar.defaultProps = {
  sqSize: 200,
  strokeWidth: 10,
  text: '',
};

export default CircularProgressBar;