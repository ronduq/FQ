import { 
  SET_PRODUCE_INFO,
  SET_PRODUCE_INFO_ANALYTES_CONTENT,
} from '../constants/'

import { setContentError } from './content';
import dataFetcher from '../lib/dataFetcher';

import {
  getSelectedProduce
} from '../selectors/index';

export const generateProduceInfoAndFetch = (dispatch, state, location, retailerCode, produce) => {
  const url = `${process.env.BASE_URL}/api/v1/${location}/retailer/${retailerCode}/picks/${produce}`;
  return new Promise(resolve => {
    dispatch(fetchProduceInfoData(resolve, url));
  });
}

export const fetchProduceInfoData = (resolve, url) => (dispatch) => {
  dataFetcher(dispatch, {
    url: url,
    method: 'GET',
    onSuccess: setProduceInfo,
    onFailure: () => setContentError(true),
  }, resolve);
}

export const setProduceInfo = ({data}) => ({
  type: SET_PRODUCE_INFO,
  payload: {data}
});

export const setProduceInfoAnalytesContent = analytesLabels => ({
  type: SET_PRODUCE_INFO_ANALYTES_CONTENT,
  payload: { analytesLabels }
});
