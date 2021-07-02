import React from 'react';
import classNames from 'classnames';
import Icon from '../components/Icon/Icon';
import t from '../components/Icon/Icon.module.scss';

import s from './Tooltip.scss';

const Tooltip = ({children, ...props}) => {
  const {
    side, 
    bubblePosition, 
    size, 
    id,
    content,
    viewport,
  } = props;
  const itemNo = Object.keys(content).filter(item => {
    if (content[item].id === id) {
      return content[item]
    }
  })
  const componentContent = content[itemNo] ? content[itemNo] : '';
  const info = () => {
    if (Object.keys(componentContent).length > 0 && viewport !== 'mobile') {
    return (
      <div className={s.iconWrapper}>
        <Icon 
          className={classNames(
            s.icon, 
            {[t.iconLarge] : size === 'large' }, 
            {[t.iconSmall] : size === 'small' },
            {[s.iconLarge] : size === 'large' }, 
            {[s.iconSmall] : size === 'small' },
            {[s.iconLeft] : side === 'left' },
            {[s.iconRight] : side === 'right' },
          )} 
          iconName='info' />
        <div className={classNames(
          s.tooltiptext, 
          {[s.top] : bubblePosition === 'top'},
          {[s.bottom] : bubblePosition === 'bottom'},
          {[s.left] : bubblePosition === 'left'},
          {[s.right] : bubblePosition === 'right'})}>
          <h4 className={s.title}>{componentContent.title}</h4>
          <p className={s.text}>{componentContent.text}</p>
        </div>
      </div>
    )} else {
      return ''
    }
  }
  return (
    <div className={s.wrapper} >
      {side === 'left' &&
        info()
      }
      <span className={s.content}>{children}</span>
      {side === 'right' &&
        info()
      }
    </div>
  )
}

export default Tooltip 