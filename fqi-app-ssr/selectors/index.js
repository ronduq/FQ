import get from 'lodash.get';
import { createSelector } from 'reselect';
import { getSelectedItems } from '../utils'

export const getRetailersState = state => state.retailers;
export const getProducesState = state => state.produces;
export const getRetailerRanksState = state => state.retailerRanks;
export const getRetailerProduces = state => state.retailerProduces;
export const getProduceInfo = state => state.produceInfo;
export const getRetailerTrends = state => state.retailerTrends;
export const getProduceTrends = state => state.produceTrends;
export const getBestPicks = state => state.bestPicks;
export const getBreadcrumbs = state => state.breadcrumbs;

export const getLocationState = state => state.locations
export const getContentState = state => state.content;

export const getLocations = state => getLocationState(state).locations;
export const getSelectedLocation = state => getLocationState(state).selectedLocation;
export const getSelectedLocationId = state => get(getSelectedLocation(state), ['id'], '');
export const getCurrentPage = state => getLocationState(state).currentPage;
export const getMetaExtra = state => getLocationState(state).metaExtra;

export const getFooterItems = state => getContentState(state).footer;
export const getViewport = state => getContentState(state).viewport;
export const getProductCardLabels = state => getContentState(state).productCardLabels;
export const getNotFoundScreens = state => getContentState(state).notFoundScreens;
export const getUsdaContent = state => getContentState(state).usdaTexts;
export const getRetailerTrendsContent = state => getContentState(state).retailerTrends;
export const getProduceTrendsContent = state => getContentState(state).produceTrends;
export const getRetailerProfileContent = state => getContentState(state).retailerProfile;
export const getProduceProfileContent = state => getContentState(state).produceProfile;
export const getHomepageContent = state => getContentState(state).homepage;
export const getHomepageSlidesContent = state => getContentState(state).homepageSlides;
export const getHomepageBackground = state => get(getHomepageContent(state), ['background_image'], '');
export const getProduceBasketContent = state => getContentState(state).produceBasket;
export const getBestPicksContent = state => getContentState(state).bestPicks;
export const getMatchCardsContent = state => getContentState(state).matchCards;
export const getFiltersContent = state => getContentState(state).filtersContent;
export const getSubscribeContent = state => getContentState(state).subscribeContent;
export const getTooltipsContent = state => getContentState(state).tooltips;
export const getSocialLinksContent = state => getContentState(state).socialLinks;
export const getBreadcrumbsContent = state => getContentState(state).breadcrumbs;
export const getHeaderContent = state => getContentState(state).header;
export const getOverallRankContent = state => getContentState(state).overallRank;
export const getButtonsContent = state => getContentState(state).buttons;
export const getCookieBannerContent = state => getContentState(state).cookieBanner;
export const getMetadataContent = state => getContentState(state).metadataContent;

//Produce
export const getProduceitems = state => getProducesState(state).items;
export const getProduceImages = state => getProducesState(state).itemsImages;
export const getProduceLabels = state => getProducesState(state).itemsLabels;
export const getProduceCount = state => getProducesState(state).count;
export const getProduceAllSelected = state => getProducesState(state).allItemsSelected;
export const getProduceInitialSelection = state => getProducesState(state).initialSelection;
export const getSelectedTrendsProduce = state => getProducesState(state).selectedProduce;
export const getProduceList = createSelector(
  getProduceitems,
  getProduceLabels,
  (produce, produceLabels) => 
  produce.reduce((obj, item) => {
    if (!item.isParent) {
      obj[item.id] = {
        label: produceLabels[item.id],
      }
    }
      return obj;
    }, {})
);
export const getSelectedProducesURL = createSelector(
  getProduceitems,
  (produces) => getSelectedItems(produces)
);

//Retailer Selectors
export const getSelectedRetailer = state => getRetailersState(state).selectedRetailer;
export const getSelectedRetailerLabel = state => 
  get(getRetailersState(state), ['itemsLabels', getSelectedRetailer(state)], '');
export const getRetailersItems = state => getRetailersState(state).items;
export const getRetailerItemsLabels = state => getRetailersState(state).itemsLabels;
export const getRetailerLogos = state => getRetailersState(state).itemsLogos;
export const getRetailerList = createSelector(
  getRetailersItems,
  getRetailerItemsLabels,
  getRetailerLogos,
  (retailers, retailerLabels, logos) => 
    retailers.reduce((obj, item) => {
      obj[item.id] = {
        label: retailerLabels[item.id],
        logo: logos[item.id]
      }
      return obj;
    }, {})
);
export const getSelectedRetailerURL = createSelector(
  getRetailersItems,
  (retailers) => getSelectedItems(retailers)
);


//Retailer rank Selectors
export const getRetailerRanksStateLabels = state => getRetailerRanksState(state).labels;
export const getRetailerRanks = state => getRetailerRanksState(state).ranks;
export const getRetailerRanksSingle = state => getRetailerRanksState(state).ranksSingle;
export const getRetailerRanksSortBy = state => getRetailerRanksState(state).selected;
export const getRetailerRanksSortDirection = state => getRetailerRanksState(state).direction;
export const getSelectedRetailerRanks = createSelector(
  getRetailerRanks,
  getSelectedRetailer,
  (retailers, selected) => retailers.find((retailer) => retailer.retailerCode === selected)
);

export const getSelectedRetailers = state => 
  getSelectedItems(get(getRetailersState(state), ['items'], []))  || 'empty'

//Produce Selectors
export const getSelectedProduce = state => 
  getSelectedItems(get(getProducesState(state), ['items'], [])) || 'empty'


//Retailer Produce
export const getRetailerProducesSortDirection = state => getRetailerProduces(state).sortDirection;
export const getProduceInfoTable = state => getRetailerProduces(state).infoTable;
export const getRetailerProducesCompareBy = state => getRetailerProduces(state).compareBy;


//Retailer Trends
export const getRetailerTrendsViewBy = state => getRetailerTrends(state).viewBy;
export const getRetailerTrendsData = state => getRetailerTrends(state).trends;
export const getRetailerTrendsCompareBy = state => getRetailerTrends(state).compareBy;
export const getIsRetailerTrendsLoading = state => getRetailerTrends(state).isLoading;
export const getShowViewByDropdown = state => getRetailerTrendsContent(state).show_view_by_dropdown;
export const getIsAnyProduceSelected = createSelector(
  getProducesState,
  (produce) => produce.items.some(item => item.selected)
);
export const getRetailerTrendsNotFoundContent = state => get(getNotFoundScreens(state), ['retailer-trends'], {});


//Produce Trends 
export const getProduceTrendsViewBy = state => getProduceTrends(state).viewBy;
export const getProduceTrendsData = state => getProduceTrends(state).trends;
export const getProduceTrendsCompareBy = state => getProduceTrends(state).compareBy;
export const getIsProduceTrendsLoading = state => getProduceTrends(state).isLoading;
export const getShowViewByDropdownProduce = state => getProduceTrendsContent(state).show_view_by_dropdown;
export const getIsAnyRetailerSelected = createSelector(
  getRetailersState,
  (retailer) => retailer.items.some(item => item.selected)
);
export const getProduceTrendsNotFoundContent = state => get(getNotFoundScreens(state), ['produce-trends'], {});

// Best Picks
export const getBestPicksSortBy = state => getBestPicks(state).criteria;
export const getBestPicksNotFoundContent = state => get(getNotFoundScreens(state), ['best-picks'], {});
