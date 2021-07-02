import { 
  SET_PRODUCE_TRENDS,
  SET_PRODUCE_TRENDS_VIEW,
  SET_PRODUCE_TRENDS_LOADING,
  SET_PRODUCE_TRENDS_COMPARE_BY
} from '../constants';

import { setContentError } from './content';
import dataFetcher from '../lib/dataFetcher';

import { 
  getProduceTrendsCompareBy,
  getProduceTrendsViewBy,
  getSelectedTrendsProduce,
  getSelectedLocationId
} from '../selectors/index'

export const generateProduceTrendsQueryAndFetch = (dispatch, state, location, produce) => {
  const apiLocation = location || getSelectedLocationId(state);
  const apiProduce = produce || getSelectedTrendsProduce(state);

  const url = `${process.env.BASE_URL}/api/v1/${apiLocation}/produce/${apiProduce}/retailertrends`;
  const trendFrequency = getProduceTrendsViewBy(state);
  const trendType = getProduceTrendsCompareBy(state);

  const produceTrendsQuery = { 
    produceCodes: 'all',
    trendFrequency,
    trendType,
    periodCount: 10
  };

  return new Promise(resolve => {
    dispatch(fetchProduceTrendsData(resolve, url, produceTrendsQuery));
  });
}

export const fetchProduceTrendsData = (resolve, url, data) => (dispatch) => 
  dataFetcher(dispatch, {
    url,
    method: 'GET',
    data,
    onLoad: setProduceTrendLoading,
    onSuccess: setProduceTrendData,
    onFailure: () => setContentError(true),
  }, resolve);


export const setProduceTrendData = ({data}) => ({
  type: SET_PRODUCE_TRENDS,
  payload: { data }
})

export const setProduceTrendLoading = (isLoading) => ({
  type: SET_PRODUCE_TRENDS_LOADING,
  payload: { isLoading }
})

export const setCompareByThunk = (compareBy) => (dispatch, getState) => {
  dispatch(setProduceTrendCompareBy(compareBy));
  generateProduceTrendsQueryAndFetch(dispatch, getState(), null, null)
}

export const setProduceTrendCompareBy = (compareBy) => ({
  type: SET_PRODUCE_TRENDS_COMPARE_BY,
  payload: { compareBy }
})

export const setProduceTrendsViewThunk = (viewBy) => (dispatch, getState) => {
  dispatch(setProduceTrendsView(viewBy));
  generateProduceTrendsQueryAndFetch(dispatch, getState(), null, null)
}

export const setProduceTrendsView = (viewBy) => ({
  type: SET_PRODUCE_TRENDS_VIEW,
  payload: { viewBy }
})