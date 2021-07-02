import { combineReducers } from 'redux';
import contentReducer from './content';
import retailersReducer from './retailers';
import producesReducer from './produces';
import locationsReducer from './locations';
import retailerProducesReducer from './retailerProduces';
import retailerRanksReducer from './retailerRanks';
import produceInfoReducer from './produceInfo';
import retailerTrendsReducer from './retailerTrends';
import produceTrendsReducer from './produceTrends';
import bestPicksReducer from './bestPicks';
import breadcrumbsReducer from './breadcrumbs';

const appReducer = () =>
  combineReducers({
    content: contentReducer,
    locations: locationsReducer,
    produces: producesReducer,
    retailers: retailersReducer,
    retailerRanks: retailerRanksReducer,
    retailerProduces: retailerProducesReducer,
    produceInfo: produceInfoReducer,
    retailerTrends: retailerTrendsReducer,
    produceTrends: produceTrendsReducer,
    bestPicks: bestPicksReducer,
    breadcrumbs: breadcrumbsReducer,
  });

// const rootReducer = history => (state, action) => {
//   if (action.type === 'LOGOUT') {
//     state = undefined;
//   }
//   return appReducer()(state, action);
// };

export default appReducer;
