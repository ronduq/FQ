import { initialContentState } from './initialState';
import { arrayToObject } from '../utils';

import { 
    CONTENT_FETCHED,
    SET_FOOTER_CONTENT,
    SET_VIEWPORT,
    SET_PRODUCT_CARD_LABELS,
    SET_NOT_FOUND_SCREENS,
    SET_USDA_CONTENT,
    SET_RETAILER_TRENDS_CONTENT,
    SET_RETAILER_PROFILE_CONTENT,
    SET_PRODUCE_PROFILE_CONTENT,
    SET_HOMEPAGE_CONTENT,
    SET_HOMEPAGE_SLIDES_CONTENT,
    SET_PRODUCE_BASKET_CONTENT,
    SET_MATCH_CARDS_CONTENT,
    SET_BEST_PICKS_CONTENT,
    SET_PRODUCE_TRENDS_CONTENT,
    SET_FILTERS_CONTENT,
    SET_SUBSCRIBE_CONTENT,
    SET_TOOLTIPS_CONTENT,
    SET_SOCIAL_LINKS_CONTENT,
    SET_BREADCRUMBS_CONTENT,
    SET_HEADER_CONTENT,
    SET_OVERALL_RANK_CONTENT,
    SET_BUTTONS_CONTENT,
    SET_COOKIE_BANNER_CONTENT,
    SET_METADATA_CONTENT,
} from '../constants';

import { getViewportType } from '../utils'

const contentReducer = (state = initialContentState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONTENT_FETCHED: {
      return {
        ...state,
        contentFetched: true
      }
    }
    case SET_FOOTER_CONTENT: {
      const { footer } = payload;
      return {
        ...state,
        footer
      };
    }
    case SET_VIEWPORT: {
      const { width } = payload;
      return {
        ...state,
        viewport: getViewportType(width)
      }
    }
    case SET_PRODUCT_CARD_LABELS: {
      const { labels } = payload;
      return {
        ...state,
        productCardLabels: labels[0]
      }
    }
    case SET_NOT_FOUND_SCREENS: {
      const { labels } = payload;
      const notFoundScreens = {}
      labels.map((label) => {
        notFoundScreens[label.id] = label;
      });
      return {
        ...state,
        notFoundScreens: notFoundScreens
      }
    }
    case SET_USDA_CONTENT: {
      const { texts } = payload;
      return {
        ...state,
        usdaTexts: texts[0],
      }
    }
    case SET_RETAILER_TRENDS_CONTENT: {
      const { retailerTrends } = payload;
      return {
        ...state,
        retailerTrends: retailerTrends[0]
      }
    }
    case SET_RETAILER_PROFILE_CONTENT: {
      const { retailerProfile } = payload;
      return {
        ...state,
        retailerProfile: retailerProfile[0]
      }
    }
    case SET_PRODUCE_TRENDS_CONTENT: {
      const { produceTrends } = payload;
      return {
        ...state,
        produceTrends: produceTrends[0]
      }
    }
    case SET_PRODUCE_PROFILE_CONTENT: {
      const { produceProfile } = payload;
      return {
        ...state,
        produceProfile: produceProfile[0]
      }
    }
    case SET_HOMEPAGE_CONTENT: {
      const { homepage } = payload;
      return {
        ...state,
        homepage: homepage[0]
      }
    }
    case SET_HOMEPAGE_SLIDES_CONTENT: {
      const { labels } = payload;
      return {
        ...state,
        homepageSlides: labels,
      }
    }
    case SET_PRODUCE_BASKET_CONTENT: {
      const { basket } = payload;
      return {
        ...state,
        produceBasket: basket[0]
      }
    }
    case SET_MATCH_CARDS_CONTENT: {
      
      const { labels } = payload;
      return {
        ...state,
        matchCards: arrayToObject(labels, 'id')
      }
    }
    case SET_BEST_PICKS_CONTENT: {
      const { labels } = payload;
      return {
        ...state,
        bestPicks: labels[0]
      }
    }
    case SET_FILTERS_CONTENT: {
      const { labels } = payload;
      return {
        ...state,
        filtersContent: labels[0]
      }
    }
    case SET_SUBSCRIBE_CONTENT: {
      const { labels } = payload;
      return {
        ...state,
        subscribeContent: labels[0]
      }
    }
    case SET_TOOLTIPS_CONTENT: {
      const { labels } = payload;
      return {
        ...state,
        tooltips: labels
      }
    }
    case SET_SOCIAL_LINKS_CONTENT: {
      const { socialLinks } = payload;
      return {
        ...state,
        socialLinks: arrayToObject(socialLinks, 'id')
      }
    }
    case SET_BREADCRUMBS_CONTENT: {
      const { labels } = payload;
      let breadcrumbLabels = {};
      labels.map(label => {
        breadcrumbLabels[label.id] = label
      })
      return {
        ...state,
        breadcrumbs: breadcrumbLabels
      }
    }
    case SET_HEADER_CONTENT: {
      const { labels } = payload;
      return {
        ...state,
        header: labels[0]
      }
    }
    case SET_OVERALL_RANK_CONTENT: {
      const { labels } = payload;
      return {
        ...state,
        overallRank: labels[0]
      }
    }
    case SET_BUTTONS_CONTENT: {
      const { labels } = payload;
      return {
        ...state,
        buttons: labels[0]
      }
    }
    case SET_COOKIE_BANNER_CONTENT: {
      const { labels } = payload;
      return {
        ...state,
        cookieBanner: labels[0]
      }
    }

    case SET_METADATA_CONTENT: {
      const { labels } = payload;
      const metadataContent = {};
      labels.map(label => {
        metadataContent[label.id] = label
      });
      return {
        ...state,
        metadataContent: metadataContent
      }
    }

    

    default:
      return state;
  }
};

export default contentReducer;
