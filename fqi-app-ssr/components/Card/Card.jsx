import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import get from 'lodash.get';
import Icon from '../Icon/Icon';
import SharePage from '../SharePage/SharePageContainer';
import t from '../Icon/Icon.module.scss';

import s from './Card.module.scss';

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstSideOpen: true,
    }
  }

  handleClick () {
    this.setState({firstSideOpen: !this.state.firstSideOpen})
  }
  
  render() {
    const { 
      produce,
      logo,
      name,
      image,
      cardLabels,
      oneSide,
      selectedLocation,
      retailerId,
      noShadow,
    } = this.props;
    let linkHref = `/retailer-profile?location=${selectedLocation}&retailer=${retailerId}`;
    let linkAs = `/${selectedLocation}/retailers/${retailerId}`
    const shareUrl = `/${selectedLocation}/produce/${produce.produceCode}/${retailerId}/`;
    
    return (
      <div className={classNames(s.card, {[s.noShadow] : noShadow})}>

        <div className={s.cardTop}>
          <Link href={linkHref} as={linkAs}>
            <a><img className={s.cardLogo} alt={`retailer name ${retailerId}`} src={logo}/></a>
          </Link>
          
          { !oneSide &&
            Object.keys(produce.countriesOfOrigin).length > 0 &&
            <button className={s.cardSwitch} onClick={() => this.handleClick()} aria-pressed={!this.state.firstSideOpen} title={cardLabels.more_info}>
              <Icon iconName="flip" className={classNames(t.iconLarge, t.iconOrangeFill)}/>
            </button>
          }
          <img className={classNames(s.cardImage,{[s.imageSecondSide]: !this.state.firstSideOpen })} src={image} alt='' />
          <div className={s.titleWrapper}>
            <h3 className={s.cardTitle}>{name}</h3>
            <SharePage 
              minimize
              id="Card"
              url={shareUrl}
            />
          </div>
          
        </div>
        { this.state.firstSideOpen &&
          <div className={s.cardMidBot}>
            <div className={s.cardMid}>
              {/* Leaving this here in case we revert */}
              {/* <div className={s.cardOrigin}>
                <Icon iconName="globe" className={classNames(t.iconMedium, t.iconTeal)}/>
                <span className={s.cardOriginText}>{produce && <span>{Object.keys(produce.countriesOfOrigin).length}</span>} {get(cardLabels, ['countries_of_origin'], 'n/a')}</span>
              </div> */}
               <span className={s.scan}>{cardLabels.last_scan} {produce.scanDate} at {produce.scanTime}</span>
              <div className={s.cardInfo}>
                <div className={classNames(s.cardInfoSide, s.cardInfoLeft)}>
                  <div className={s.cardInfoItem}>
                    <span className={s.cardInfoLabel}>{cardLabels.quality}</span>
                    <span className={s.cardInfoTextLarge}>{produce.quality}%</span>
                  </div>
                </div>
                <div className={classNames(s.cardInfoSide, s.cardInfoRight)}>
                  <div className={s.cardInfoItem}>
                    <span className={s.cardInfoLabel}>{cardLabels.value}</span>
                    <span className={s.cardInfoText}>{produce.value}</span>
                  </div>
                  <div className={s.cardInfoItem}>
                    <span className={s.cardInfoLabel}>{cardLabels.perception}</span>
                    <span className={s.cardInfoText}>{produce.perceptionScore}</span>
                  </div>
                </div>
              </div>
            </div>
            { !oneSide &&
              <div className={s.cardBottom}>
                <Link 
                  href={`/produce-trends?location=${selectedLocation}&produce=${produce.produceCode}&retailer=${retailerId}`}
                  as={`/${selectedLocation}/produce/${produce.produceCode}/trends`}
                >
                  <a className={s.linkButton}>
                    {cardLabels.trends}
                    <Icon className={classNames(s.arrowIcon, t.iconSmall, t.iconOrange, s.arrowRight)} iconName={`chevron`} />
                  </a>
                </Link>
                <Link 
                  href={`/produce-profile?location=${selectedLocation}&produce=${produce.produceCode}&retailer=${retailerId}`}
                  as={`/${selectedLocation}/produce/${produce.produceCode}/${retailerId}/`}
                >
                  <a className={s.linkButton}>
                    {cardLabels.profile}
                    <Icon className={classNames(s.arrowIcon, t.iconSmall, t.iconOrange, s.arrowRight)} iconName={`chevron`} />
                  </a>
                </Link>
              </div>
            }
          </div>
        }
        { !this.state.firstSideOpen &&
          <ul className={s.cardMid}>
            {Object.keys(produce.countriesOfOrigin).map((orig, index) => {
              const item = produce.countriesOfOrigin[orig]
              while (index < 3) {
                return (
                  <li className={s.cardOrigin} key={`country-${index}`}>
                    <Icon iconName="globe" className={classNames(t.iconMedium, t.iconTeal)}/>
                    <span className={s.cardOriginText}>{cardLabels.product_of} {item.countryName}</span>
                    { item.isOrganic &&
                      <div className={s.cardOrganic}>
                        <span className={s.organicLabel}>{cardLabels.organic}</span>
                        <Icon iconName="organic" className={classNames(t.iconMedium, t.iconTeal)}/>
                      </div>
                    }
                  </li>
                )
              }
            })}
            <span className={s.scan}>{cardLabels.last_scan} {produce.scanDate} at {produce.scanTime}</span>
          </ul>
        }
      </div>
    );
  };
}

Card.propTypes = {
  produce: PropTypes.shape(),
  logo: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  cardLabels: PropTypes.shape(),
  selectedLocation: PropTypes.string,
};

Card.defaultProps = {
  produce: {},
  logo: '',
  name: '',
  image: '',
  cardLabels: {},
};

export default Card;
