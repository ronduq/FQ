import { setProducesContent, fetchProduceData, selectAllProducesThunk } from './producesActions';
import { setRetailersContent , fetchRetailersData, selectAllRetailersThunk } from './retailers';
import { setLocations, setSelectedLocation } from './locations';
import { setRetailersTable, setRankedRetailerSingle } from  './retailerRanks';
import { setProduceInfoAnalytesContent } from './produceInfo'

import dataFetcher from '../lib/dataFetcher';

import { 
  CONTENT_ERROR, 
  CONTENT_FETCHED, 
  SET_FOOTER_CONTENT, 
  SET_VIEWPORT,
  SET_NOT_FOUND_SCREENS,
  SET_PRODUCT_CARD_LABELS,
  SET_USDA_CONTENT,
  SET_RETAILER_TRENDS_CONTENT,
  SET_RETAILER_PROFILE_CONTENT,
  SET_PRODUCE_PROFILE_CONTENT,
  SET_HOMEPAGE_CONTENT,
  SET_PRODUCE_BASKET_CONTENT,
  SET_BEST_PICKS_CONTENT,
  SET_MATCH_CARDS_CONTENT,
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
  SET_HOMEPAGE_SLIDES_CONTENT,
  SET_METADATA_CONTENT,
} from '../constants'

export const fetchContent = (resolve) => (dispatch) =>
  dataFetcher(dispatch, {
    url: `${process.env.BASE_URL}/api/v1/content/?keys=social_links,produce_trends,produce_basket,homepage,produce,locations,retailers,retailer_profile,retailers_table,retailer_trends,footer,not_found_screens,product_card_labels,analytes,usda_texts,produce_profile,match_cards,best_picks,filters_content,tooltips,breadcrumbs,subscribe_page,header,overall_rank,buttons,cookie_banner,homepage_slides,metadata`,
    method: 'GET',
    onSuccess: setContent,
    onFailure: () => setContentError(true),
  }, resolve);
  
export const setContentError = value => ({
  type: CONTENT_ERROR,
  payload: { value }
});

export const setContent = ({data}) => async (dispatch) => {
  if (data.produce) dispatch(setProducesContent(data.produce))
  if (data.retailers) dispatch(setRetailersContent(data.retailers))
  if (data.locations) dispatch(setLocations(data.locations))
  if (data.retailers_table) dispatch(setRetailersTable(data.retailers_table))
  if (data.retailer_profile) dispatch(setRetailerProfile(data.retailer_profile))
  if (data.footer) dispatch(setFooterContent(data.footer))
  if (data.product_card_labels) dispatch(setProductCardLabelsContent(data.product_card_labels))
  if (data.not_found_screens) dispatch(setNotFoundScreensContent(data.not_found_screens))
  if (data.analytes) dispatch(setProduceInfoAnalytesContent(data.analytes))
  if (data.usda_texts) dispatch(setUsdaContent(data.usda_texts))
  if (data.produce_profile) dispatch(setProduceProfileContent(data.produce_profile))
  if (data.retailer_trends) dispatch(setRetailerTrendsContent(data.retailer_trends))
  if (data.homepage) dispatch(setHomepageContent(data.homepage))
  if (data.homepage_slides) dispatch(setHomepageSlidesContent(data.homepage_slides))
  if (data.produce_basket) dispatch(setProduceBasketContent(data.produce_basket))
  if (data.match_cards) dispatch(setMatchCardsContent(data.match_cards))
  if (data.best_picks) dispatch(setBestPicksContent(data.best_picks))
  if (data.produce_trends) dispatch(setProduceTrendsContent(data.produce_trends))
  if (data.filters_content) dispatch(setFiltersContent(data.filters_content))
  if (data.subscribe_page) dispatch(setSubscribeContent(data.subscribe_page))
  if (data.tooltips) dispatch(setTooltipsContent(data.tooltips))
  if (data.social_links) dispatch(setSocialLinksContent(data.social_links))
  if (data.breadcrumbs) dispatch(setBreadcrumbsContent(data.breadcrumbs))
  if (data.header) dispatch(setHeaderContent(data.header))
  if (data.overall_rank) dispatch(setOverallRankContent(data.overall_rank))
  if (data.buttons) dispatch(setButtonsContent(data.buttons))
  if (data.cookie_banner) dispatch(setCookieBannerContent(data.cookie_banner))
  if (data.metadata) dispatch(setMetadataContent(data.metadata))
  dispatch(setContentFetched())
}

export const setSocialLinksContent = (socialLinks) => ({
  type: SET_SOCIAL_LINKS_CONTENT,
  payload: { socialLinks }
});

export const setProduceBasketContent = (basket) => ({
  type: SET_PRODUCE_BASKET_CONTENT,
  payload: { basket }
});

export const setHomepageContent = (homepage) => ({
  type: SET_HOMEPAGE_CONTENT,
  payload: { homepage }
});

export const setHomepageSlidesContent = (labels) => ({
  type: SET_HOMEPAGE_SLIDES_CONTENT,
  payload: { labels }
})

export const setContentFetched = () => ({
  type: CONTENT_FETCHED,
  payload: { }
});

export const setFooterContent = (footer) => ({
  type: SET_FOOTER_CONTENT,
  payload: { footer }
});

export const setViewport = (width) => ({
  type: SET_VIEWPORT,
  payload: { width }
});

export const setProductCardLabelsContent = (labels) => ({
  type: SET_PRODUCT_CARD_LABELS,
  payload: { labels }
});


export const setNotFoundScreensContent = (labels) => ({
  type: SET_NOT_FOUND_SCREENS,
  payload: { labels }
});

export const setUsdaContent = (texts) => ({
  type: SET_USDA_CONTENT,
  payload: { texts }
});

export const setRetailerTrendsContent = (retailerTrends) => ({
  type: SET_RETAILER_TRENDS_CONTENT,
  payload: { retailerTrends }
});

export const setProduceTrendsContent = (produceTrends) => ({
  type: SET_PRODUCE_TRENDS_CONTENT,
  payload: { produceTrends }
});

export const setRetailerProfile = (retailerProfile) => ({
  type: SET_RETAILER_PROFILE_CONTENT,
  payload: { retailerProfile }
});

export const setProduceProfileContent = (produceProfile) => ({
  type: SET_PRODUCE_PROFILE_CONTENT,
  payload: { produceProfile }
});

export const setBestPicksContent = (labels) => ({
  type: SET_BEST_PICKS_CONTENT,
  payload: { labels }
});

export const setMatchCardsContent = (labels) => ({
  type: SET_MATCH_CARDS_CONTENT,
  payload: { labels }
});

export const setFiltersContent = (labels) => ({
  type: SET_FILTERS_CONTENT,
  payload: { labels }
});

export const setSubscribeContent = (labels) => ({
  type: SET_SUBSCRIBE_CONTENT,
  payload: { labels }
})

export const setTooltipsContent = (labels) => ({
  type: SET_TOOLTIPS_CONTENT,
  payload: { labels }
});

export const setBreadcrumbsContent = (labels) => ({
  type: SET_BREADCRUMBS_CONTENT,
  payload: { labels }
});

export const setHeaderContent = (labels) => ({
  type: SET_HEADER_CONTENT,
  payload: { labels }
});

export const setOverallRankContent = (labels) => ({
  type: SET_OVERALL_RANK_CONTENT,
  payload: { labels }
})

export const setButtonsContent = (labels) => ({
  type: SET_BUTTONS_CONTENT,
  payload: { labels }
})

export const setCookieBannerContent = (labels) => ({
  type: SET_COOKIE_BANNER_CONTENT,
  payload: { labels }
})

export const setMetadataContent = (labels) => ({
  type: SET_METADATA_CONTENT,
  payload: { labels }
})

export const setLocationAndFetchContent = (dispatch, location) => {
  const contentToLoad = [];
  dispatch(setSelectedLocation(location));

  contentToLoad.push(new Promise(resolve => {
    dispatch(fetchProduceData(resolve, location));
  }));

  contentToLoad.push(new Promise(resolve => {
    dispatch(fetchRetailersData(resolve, location));
  }));

  return Promise.all(contentToLoad)
}

export const resetFiltersThunk = () => dispatch => {
  dispatch(selectAllProducesThunk(true, true))
  dispatch(selectAllRetailersThunk(true, true))
  dispatch(setRankedRetailerSingle({data:''}))
}
