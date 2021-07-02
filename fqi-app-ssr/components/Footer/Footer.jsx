import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import s from './Footer.scss';


const Footer = ({
  theme,
  footerItems
}) => {
  return (
    <footer className={classNames('container', s.footer)}>
      <a href="https://www.teakorigin.com" target="_blank" aria-label="Teak Origin (opens in new window)">
        <Icon className={classNames(s.logo, s.themeBlack, {[s.themeWhite]: theme === 'white'} )} iconName="logo" />
      </a>
      <ul>
        {footerItems.map(({link, title}, idx) => 
          <li key={`footer-${idx}`}>
            <a href={link} target="_blank" className={classNames({[s.themeWhite]: theme === 'white'} )}>
              {title}
              <span className="screen-reader-text">(opens in new window)</span>
            </a>
          </li>
        )}
      </ul>
    </footer>
  );
};

Footer.propTypes = {
  footerItems: PropTypes.array,
};

Footer.defaultProps = {
  theme: 'black',
};

export default Footer;
