import { initialRetailerTrendsState } from './initialState';
import { 
  SET_RETAILER_TRENDS,
  SET_RETAILER_TRENDS_VIEW,
  SET_RETAILER_TRENDS_COMPARE_BY,
  SET_RETAILER_TRENDS_LOADING,
} from '../constants/'

const retailerTrendsReducer = (state = initialRetailerTrendsState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_RETAILER_TRENDS: {
      const { data } = payload;
      return {
        ...state,
        trends: data
      }
    }
    case SET_RETAILER_TRENDS_VIEW: {
      const { viewBy } = payload;
      return {
        ...state,
        viewBy
      }
    }
    case SET_RETAILER_TRENDS_COMPARE_BY: {
      const { compareBy } = payload;
      return {
        ...state,
        compareBy
      }
    }
    case SET_RETAILER_TRENDS_LOADING: {
      const { isLoading } = payload;
      return {
        ...state,
        isLoading
      }
    }
    default:
      return state;
  }
};

export default retailerTrendsReducer;
