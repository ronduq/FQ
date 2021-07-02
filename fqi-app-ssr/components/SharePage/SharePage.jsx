import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import get from 'lodash.get';
import Icon from '../Icon/Icon';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

import s from './SharePage.scss';
import Head from 'next/head';
const SharePage = ({
  compareBy,
  content,
  id,
  includeProduces,
  includeRetailers,
  minimize,
  producesUrl,
  retailersUrl,
  url,
  viewBy,
  viewport,
  buttonContent,
}) => {
  const {
    title = 'TeakOrigin Guide',
    share_texts = buttonContent.share_this_page,
  } = get(content , [id], {});

  const inputEl = useRef(null);

  const [showHide, setShowHide] = useState(false);
  const handleToggle = () => setShowHide(!showHide);

  useEffect(() => {
    setShowHide(false);
  }, [viewport]);

  const generateUrl = () => {
    if (typeof window !== 'undefined') {
      const { origin, pathname } = get(window , ['location'], {});
      const urlParams = [];

      if (url) return `${origin}${url}`
      
      if (includeProduces) {
        urlParams.push(`produces=${producesUrl}`)
      }

      if (includeRetailers) {
        urlParams.push(`retailers=${retailersUrl}`)
      }

      if (compareBy) {
        urlParams.push(`compare=${compareBy}`)
      }

      if (viewBy) {
        urlParams.push(`viewby=${viewBy}`)
      }

      return `${origin}${pathname}?${urlParams.join('&')}`
    }
    return '';
  }

  const generatedUrl = generateUrl();

  useEffect(() => {
    if (showHide && inputEl) {
      const handleExternalClick = (e) => {
        if (!inputEl.current.contains(e.target)) {
          setShowHide(false)
        } 
      }
  
      window.addEventListener("click", handleExternalClick);
      return () => window.removeEventListener("click", handleExternalClick);
    }
  }, [showHide, setShowHide]);
  
  return (
    <div className={classNames(s.sharePage, {
      [s.mobile]: viewport !== 'xlarge', 
      [s.produceTrends]: id === 'ProduceTrends',
      [s.retailerProfile]: id === 'RetailerProfile',
      [s.bestPicks]: id === 'BestPicks'
      })
    }>
      { !minimize &&  <p className={s.title}>{share_texts}</p> }

      <button className={s.toggleShare} onClick={handleToggle} aria-haspopup="true" aria-controls="SocialLinks" aria-expanded={showHide} aria-label="Toggle Filters">
        <Icon className={s.toggleShareIcon} iconName="shareIcon" />
      </button>

      <div id="SocialLinks" className={classNames(s.shareButtonWrapper, {[s.active]: showHide }) } ref={inputEl}>
        <FacebookShareButton
          url={generatedUrl}
          quote={title}
          className={s.shareButton}
        >
          <FacebookIcon size={28} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={generatedUrl}
          title={title}
          className={s.shareButton}
        >
          <TwitterIcon size={28} round />
        </TwitterShareButton>

        <LinkedinShareButton 
          url={generatedUrl} 
          className={s.shareButton}
        >
          <LinkedinIcon size={28} round />
        </LinkedinShareButton>

        <CopyToClipboard text={generatedUrl} >
          <button className={s.copyToClipboard}>
            <Icon className={s.copyToClipboardIcon} iconName="copyClipboard" />
          </button>
        </CopyToClipboard>
      </div>

      
    </div>
  );
};


SharePage.defaultProps = {
  includeProduces: false,
  includeRetailers: false,
  minimize: false,
  viewport: 'xlarge'
};

SharePage.propTypes = {
  content: PropTypes.shape(),
  compareBy: PropTypes.string,
  id: PropTypes.string,
  minimize: PropTypes.bool,
  producesUrl: PropTypes.string,
  retailersUrl: PropTypes.string,
  includeProduces: PropTypes.bool,
  includeRetailers: PropTypes.bool,
  url: PropTypes.string,
  viewBy: PropTypes.string,
  viewport: PropTypes.string,
};

export default SharePage;