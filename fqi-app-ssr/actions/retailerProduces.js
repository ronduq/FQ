import { 
  SET_RETAILER_PRODUCES,
  SET_RETAILER_PRODUCES_SORT,
  SET_PRODUCE_INFO_TABLE,
  SET_RETAILER_PRODUCES_COMPAREBY
} from '../constants/'

import dataFetcher from '../lib/dataFetcher';
import { setContentError } from './content';

import {
  getSelectedProduce,
  getRetailerProducesCompareBy,
  getRetailerProducesSortDirection,
  getSelectedLocationId,
  getSelectedRetailer
} from '../selectors/index';

export const generateRetailersProduceQueryAndFetch = (dispatch, state, location, retailerCode) => {
  const url = `${process.env.BASE_URL}/api/v1/${location}/retailer/${retailerCode}/picks`;
  const produceCodes = getSelectedProduce(state);
  const sortBy = getRetailerProducesCompareBy(state);
  const sortDirection = getRetailerProducesSortDirection(state);
  const produceQuery = { 
    produceCodes, 
    sortBy,
    sortDirection
  };    
  return new Promise(resolve => {
    dispatch(fetchRetailersProduceData(resolve, url, produceQuery));
  });
}

export const fetchRetailersProduceData = (resolve, url, data) => (dispatch) =>
  dataFetcher(dispatch, {
    url,
    method: 'GET',
    onSuccess: setRetailerProduces,
    data,
    onFailure: () => setContentError(true),
  }, resolve);

export const setRetailerProduces = produces => ({
  type: SET_RETAILER_PRODUCES,
  payload: { produces }
});

export const updateRetailerProduces = (produceId, check, parentCode, isParent, produce) => ({
  type: UPDATE_RETAILER_PRODUCE,
  payload: {produceId, check, parentCode, isParent, produce}
});
    
export const setRetailerProducesDirectionAndFetch = (sortDirection) => (dispatch) => {
  dispatch(updateSortDirection(sortDirection));
  dispatch(fetchRetailerProducesDataThunk());
}

export const fetchRetailerProducesDataThunk = () => (dispatch, getState) => {
  const state = getState();
  const location = getSelectedLocationId(state);
  const retailerCode = getSelectedRetailer(state);
  generateRetailersProduceQueryAndFetch(dispatch, state, location, retailerCode)
}

export const updateSortDirection = sortDirection => ({
  type: SET_RETAILER_PRODUCES_SORT,
  payload: { sortDirection }
});

export const setProduceInfoTable = (produce, title) => ({
  type: SET_PRODUCE_INFO_TABLE,
  payload: { produce, title }
});
    
export const setRetailerProducesCompareBy = (compareBy, direction) => ({
  type: SET_RETAILER_PRODUCES_COMPAREBY,
  payload: { compareBy, direction }
});

export const sortRetailerProducesCompareByAndFetchThunk = (compareBy, direction) => (dispatch) => {
  const sortDirection = direction === 'topToBottom' ? 'DSC' : 'ASC'
  dispatch(setRetailerProducesCompareBy(compareBy, sortDirection));
  dispatch(fetchRetailerProducesDataThunk());
}
