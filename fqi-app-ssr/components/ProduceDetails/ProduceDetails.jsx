import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import Card from '../Card/CardContainer';
import s from './ProduceDetails.scss';


const ProduceDetails = ({
  selectedRetailerId,
  retailersData,
  producesData,
  produceInfo,
  viewport,
  content,
}) => {
  const produceCode = produceInfo.info.produceCode;
  const youtubeId = producesData.itemsVideos[produceCode];
  const opts = {
    width: '100%',
    height: 'auto',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      rel: 0,
      showInfo: 0,
      modestbranding: 1,
      controls: 1,
      frameBorder: 0,
    }
  };
  return (
    <div className={s.container}>
      <h3 className={s.title}>{content.produce_metrics}</h3>
      { Object.entries(produceInfo.info).length > 0 &&
      <Card 
        produce={produceInfo.info} 
        retailerId={selectedRetailerId}
        logo={retailersData.itemsLogos[selectedRetailerId]}
        name={producesData.itemsLabels[produceCode]}
        image={producesData.itemsImages[produceCode]}
        oneSide='true'
        noShadow={true}
      />
      }
      { youtubeId &&
        viewport !== 'mobile' &&
        <div className={s.videoContainer}>
          <h4 className={s.videoTitle}>{content.about} {producesData.itemsLabels[produceCode]}</h4>
          <p className={s.videoText}>{producesData.itemsVideosText[produceCode]}</p>
          <div className={s.video}>
            <YouTube
              videoId={youtubeId}
              id={youtubeId}
              opts={opts}
            />
          </div>
        </div>
      }
    </div>
  );
};

ProduceDetails.propTypes = {
  selectedRetailerId: PropTypes.string,
  retailersData: PropTypes.shape(),
  producesData: PropTypes.shape(),
  produceInfo: PropTypes.shape(),
  viewport: PropTypes.string,
};

ProduceDetails.defaultProps = {
  selectedRetailerId: '',
  retailersData: {},
  producesData: {},
  produceInfo: {},
  viewport: '',
};

export default ProduceDetails;
