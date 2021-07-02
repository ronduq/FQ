import React from 'react';
import classNames from 'classnames';

import Header from '../components/Header/HeaderContainer';
import Footer from '../components/Footer/FooterContainer';

import s from './Layout.scss';

export default Component => {
  const Layout = (props) =>  {
    const { homepage, background } = props;
    const footerTheme = homepage ? 'white' : 'black';
    return (
      <div className={classNames('globalWrapper', {[s.homepage]: homepage })} >
        {homepage && <div className={s.homepageImage} style={homepage && {backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${background})`}}></div>}
        <Header />
        <div className='headerSpacing'>
          <Component { ...props } />
        </div>
        <Footer theme={footerTheme} />
      </div>
    )
  }
  return Layout;
}
