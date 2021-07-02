import React from 'react';
import classNames from 'classnames';

import s from './HomeSlide.scss';

const HomeSlide = ({content}) => {
  return (
    <div className={s.container}>
      <section className={classNames(
        s.slideLayout, 
        'layout', 
        {['layout--7-5']: !content.image_right}, 
        {['layout--5-7']: content.image_right}, 
        {[s.reverse]: content.image_right}
        )}
      >
        {!content.image_right &&
          <div className={classNames(s.imageSide,'layout__column--1')}>
            <img className={s.image} src={content.image} alt='test' />
          </div>
        } 
        <div className={classNames(s.contentSide, {['layout__column--2']: !content.image_right}, {[`layout__column--1 ${s.reverse2}`]: content.image_right})}>
          <p className={s.label}>{content.label}</p>
          <h3 className={s.title}>{content.title}</h3>
          <div className={s.text} dangerouslySetInnerHTML={{__html: `${content.text}`}}></div>
          { content.button_link &&
            <a href={content.button_link} target='_blank' className={s.link}>{content.button_text}</a>
          }
        </div>
        {content.image_right &&
          <div className={classNames(s.imageSide,'layout__column--2',s.reverse1)}>
            <img className={s.image} src={content.image} alt='test' />
          </div>
        } 
      </section>
    </div>
  );
};

HomeSlide.defaultProps = {
};

HomeSlide.propTypes = {
};

export default HomeSlide;
