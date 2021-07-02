import { initialProduceTrendsState } from './initialState';
import { 
  SET_PRODUCE_TRENDS,
  SET_PRODUCE_TRENDS_VIEW,
  SET_PRODUCE_TRENDS_COMPARE_BY,
  SET_PRODUCE_TRENDS_LOADING,
} from '../constants/'

const produceTrendsReducer = (state = initialProduceTrendsState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_PRODUCE_TRENDS: {
      const { data } = payload;
      return {
        ...state,
        trends: data
      }
    }
    case SET_PRODUCE_TRENDS_VIEW: {
      const { viewBy } = payload;
      return {
        ...state,
        viewBy
      }
    }
    case SET_PRODUCE_TRENDS_COMPARE_BY: {
      const { compareBy } = payload;
      return {
        ...state,
        compareBy
      }
    }
    case SET_PRODUCE_TRENDS_LOADING: {
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

export default produceTrendsReducer;
