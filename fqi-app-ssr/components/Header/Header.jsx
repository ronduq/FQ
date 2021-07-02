import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link'
import get from 'lodash.get';
import { useRouter } from 'next/router'

import Icon from '../Icon/Icon';
import InputTemplate from '../InputTemplate/InputTemplate';

import s from './Header.scss';

import { debounce, getWindowDimensions } from '../../utils'

const Header = ({
  locations,
  selectedLocation,
  resetFilters,
  setViewport,
  viewport,
  headerContent,
  breadcrumbs,
}) => {
  const [showLocationIcon, setShowLocationIcon] = useState(false);
  const locationButtonRef = useRef(null);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setViewport(getWindowDimensions().width);
    }, 250)

    setViewport(getWindowDimensions().width);

    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [viewport]);

  const { id: selectedLocationId, label: selectedLocationLabel}  = selectedLocation;

  const { pathname, push } = useRouter();

  const handleChange = e =>  {
    setShowLocationIcon(false);
    
    const newLocationId = e.target.value;
    let path = pathname;
    let urlPath =  'produce';

    if (pathname !== '/produce-basket') {
      resetFilters();
      path = '/overallrank';
      urlPath =  'retailers';
    }
  
    push({
      pathname: path,
      query: { location: newLocationId }
    }, `/${newLocationId}/${urlPath}`)
    if (locationButtonRef.current) locationButtonRef.current.focus();
  }
  const isHomePage = pathname === '/';
  const isSubscribePage = pathname === '/subscribe';
  const enableSelect = selectedLocationId && !isHomePage;
  const isViewportLarge = ['large', 'xlarge'].includes(viewport);
  const showLocationDropdown = !isViewportLarge && showLocationIcon;
  const showLocation = showLocationDropdown || isViewportLarge;

  return (
    <header className={s.headerWrapper}>
      <div className={classNames('container', s.header)}>
        
        <div className={s.backLinkWrapper}>
          <Link href="/">
            <a className={s.title}>
              {headerContent.teakorigin} <span> {headerContent.guide} </span>
            </a>
          </Link>
        </div> 

        { !isSubscribePage && !isHomePage && !['mobile', 'tablet'].includes(viewport) &&
          <div className={s.breadcrumb}> 
          { breadcrumbs.grandparentPage &&
            <Link href={breadcrumbs.grandparentPage.link} as={breadcrumbs.grandparentPage.as}>
              <span  className={s.breadcrumbsParent}>
                <a>
                  {get(breadcrumbs.grandparentPage, ['label'], '')}  
                </a> |
              </span>
            </Link>
            }
            { breadcrumbs.parentPage &&
            <Link href={breadcrumbs.parentPage.link} as={breadcrumbs.parentPage.as}>
              <span className={s.breadcrumbsParent}>
                <a>
                  {get(breadcrumbs.parentPage, ['label'], '')}
                </a> |
              </span>
            </Link>
            }
            <span className={s.currentPage}>{breadcrumbs.currentPage}</span>
          </div>
        }

        <div className={s.alignRight}>
          { enableSelect && !isViewportLarge &&
              <button ref={locationButtonRef} aria-label={`Selected location - ${selectedLocationLabel}`} className={s.locationButton} aria-expanded={showLocationIcon} onClick={(e)=> setShowLocationIcon(!showLocationIcon)}>
                <Icon iconName="location" className={s.locationIcon}/>
                <span>{selectedLocationLabel}</span>
              </button>
            }
           { enableSelect && showLocation &&
            <InputTemplate label={headerContent.location} classname={classNames(s.locationSelect, {[s.locationDropdown]: showLocationDropdown })}>
              <select value={selectedLocationId} onChange={handleChange}>
                {locations.map(({id, label}) => (
                  <option key={`location-${id}`} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </InputTemplate>
          }
          <Link href={`/subscribe`}>
            <a className={s.subscribe}>
              <Icon className={s.ctaIcon} iconName="envelope" />
              <span>{headerContent.subscribe}</span>
            </a>
          </Link>
        </div>
      
      </div>
      
    </header>
  );
};

Header.propTypes = {
  locations: PropTypes.array,
  selectedLocation: PropTypes.shape(),
  selectAllRetailers: PropTypes.func,
  selectAllProduces: PropTypes.func,
  viewport: PropTypes.string.isRequired,
};

Header.defaultProps = {
  locations: [],
  selectAllRetailers: () => {},
  selectAllProduces: () => {},
  selectedLocation: {
    id: '',
    label: ''
  }
};

export default Header;