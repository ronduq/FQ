import {
  SET_SORT_RANKS,
  SET_RETAILERS_TABLE,
  SET_RANKED_RETAILER,
  SET_RANKED_RETAILER_SINGLE,
  SET_INITIAL_RANKED_COMPARE_BY,
} from '../constants';

import dataFetcher from '../lib/dataFetcher';
import { setContentError } from './content';
import { getSelectedLocation } from '../selectors';

import {
  getSelectedProduce,
  getSelectedRetailers,
  getRetailerRanksSortBy,
  getRetailerRanksSortDirection
} from '../selectors/index';

export const setRetailersTable = (content) => ({
  type: SET_RETAILERS_TABLE,
  payload: { content }
});

export const generateRetailersRankQueryAndFetch = (dispatch, state, location, produce, retailer) => {
  const url = `${process.env.BASE_URL}/api/v1/${location}/retailers/rank`;
  const produceCodes = produce ? produce : getSelectedProduce(state);
  const retailerCodes = getSelectedRetailers(state);
  const sortBy = getRetailerRanksSortBy(state);
  const sortDirection = getRetailerRanksSortDirection(state)  === 'topToBottom' ? 'DSC' : 'ASC';

  const produceQuery = { 
    produceCodes, 
    retailerCodes, 
    sortBy,
    sortDirection
  };    

  return new Promise(resolve => {
    if (produce || retailer) {
      dispatch(fetchRankedRetailerSingle(resolve, url, produceQuery));
    } else {
      dispatch(fetchRankedRetailer(resolve, url, produceQuery));
    }
  });
}
    
export const fetchRankedRetailer = (resolve, url, data) => (dispatch) =>
  dataFetcher(dispatch, {
    url,
    method: 'GET',
    onSuccess: setRankedRetailer,
    data,
    onFailure: () => setContentError(true),
  }, resolve);

  export const fetchRankedRetailerSingle = (resolve, url, data) => (dispatch) =>
  dataFetcher(dispatch, {
    url,
    method: 'GET',
    onSuccess: setRankedRetailerSingle,
    data,
    onFailure: () => setContentError(true),
  }, resolve);

export const setRankedRetailer = ({data}) => ({
  type: SET_RANKED_RETAILER,
  payload: { data }
});

export const setRankedRetailerSingle = ({data}) => ({
  type: SET_RANKED_RETAILER_SINGLE,
  payload: { data }
});

export const setInitialCompareBy = (compareBy) => ({
  type: SET_INITIAL_RANKED_COMPARE_BY,
  payload: { compareBy }
})

export const setRetailerRanks = (criteria, direction) => ({
  type: SET_SORT_RANKS,
  payload: { criteria, direction }
});

export const sortRankDirectionThunk = (criteria, direction) => (dispatch, getState) => {
  dispatch(setRetailerRanks(criteria, direction));
  const state = getState();
  const selectedLocation = getSelectedLocation(state);
  generateRetailersRankQueryAndFetch(dispatch, state, selectedLocation.id)
}
