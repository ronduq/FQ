import { 
  SET_RETAILER_TRENDS,
  SET_RETAILER_TRENDS_VIEW,
  SET_RETAILER_TRENDS_LOADING,
  SET_RETAILER_TRENDS_COMPARE_BY
} from '../constants';

import { setContentError } from './content';
import dataFetcher from '../lib/dataFetcher';

import { 
  getRetailerTrendsCompareBy,
  getRetailerTrendsViewBy,
  getSelectedRetailer,
  getSelectedLocationId
} from '../selectors/index'

export const generateRetailerTrendsQueryAndFetch = (dispatch, state, location, retailer) => {

  const apilocation = location || getSelectedLocationId(state)
  const apiretailer = retailer || getSelectedRetailer(state)

  const url = `${process.env.BASE_URL}/api/v1/${apilocation}/retailer/${apiretailer}/producetrends`;
  const trendFrequency = getRetailerTrendsViewBy(state);
  const trendType = getRetailerTrendsCompareBy(state);

  const produceTrendsQuery = { 
    produceCodes: 'all',
    trendFrequency,
    trendType,
    periodCount: 10
  };

  return new Promise(resolve => {
    dispatch(fetchRetailerTrendsData(resolve, url, produceTrendsQuery));
  });
}

export const fetchRetailerTrendsData = (resolve, url, data) => (dispatch) => 
  dataFetcher(dispatch, {
    url,
    method: 'GET',
    data,
    onLoad: setRetailersTrendLoading,
    onSuccess: setRetailersTrendData,
    onFailure: () => setContentError(true),
  }, resolve);


export const setRetailersTrendData = ({data}) => ({
  type: SET_RETAILER_TRENDS,
  payload: { data }
})

export const setRetailersTrendLoading = (isLoading) => ({
  type: SET_RETAILER_TRENDS_LOADING,
  payload: { isLoading }
})

export const setCompareByThunk = (compareBy) => (dispatch, getState) => {
  dispatch(setRetailersTrendCompareBy(compareBy));
  generateRetailerTrendsQueryAndFetch(dispatch, getState(), null, null, false)
}

export const setRetailersTrendCompareBy = (compareBy) => ({
  type: SET_RETAILER_TRENDS_COMPARE_BY,
  payload: { compareBy }
})

export const setRetailerTrendsViewThunk = (viewBy) => (dispatch, getState) => {
  dispatch(setRetailerTrendsView(viewBy));
  generateRetailerTrendsQueryAndFetch(dispatch, getState(), null, null, false)
}

export const setRetailerTrendsView = (viewBy) => ({
  type: SET_RETAILER_TRENDS_VIEW,
  payload: { viewBy }
})