import { produceInfo } from './initialState';
import { 
  SET_PRODUCE_INFO,
  SET_PRODUCE_INFO_ANALYTES_CONTENT,
} from '../constants/'

const produceInfoReducer = (state = produceInfo, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_PRODUCE_INFO: {
      const { data } = payload;
      if(state.labels) {
        Object.keys(data[0].analytes).map(analyte => {
          Object.keys(state.labels).map(label => {
            if(data[0].analytes[analyte].id === state.labels[label].id){
              data[0].analytes[analyte].label = state.labels[label].label;
            }
          })
        });
      }
      return {
        ...state,
        info: data[0]
      }
    }
    case SET_PRODUCE_INFO_ANALYTES_CONTENT: {
      const { analytesLabels } = payload;
      if (analytesLabels.length > 0) {
        return {
          ...state,
          labels: analytesLabels
        }
      }
    }
    default:
      return state;
  }
};

export default produceInfoReducer;
