
import * as retailerRanksActions from './retailerRanks';
import dataFetcher from '../lib/dataFetcher'

jest.mock('../lib/dataFetcher', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('Retailer ranks Actions ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const dispatch = jest.fn(); 
  const state = {
    retailers: {
      items: [{
        retailerCode:"aldi",
        retailerName:"Aldi",
        id:"aldi",
        selected:true
      }]
    },
    produces: {
      items: [{
        produceCode:"avocado",
        produceName:"Avocado",
        isParent:false,
        isChild:false,
        id:"avocado",
        selected:true,
      }]
    },
    retailerRanks: {
      selected:"quality",
      direction:"topToBottom"
    }
  }

  it(`should call generateRetailersRankQueryAndFetch and then call dispatch`, async () => {
    const location = 'boston';
    retailerRanksActions.generateRetailersRankQueryAndFetch(dispatch, state, location)
    expect(dispatch).toHaveBeenCalledTimes(1)
  });

  it(`should call fetchRankedRetailer then call dataFetcher`, async () => {
    const resolve = (e) => e;
    const url = 'http://www.exmaple.com'
    const data = {test: 1};
    retailerRanksActions.fetchRankedRetailer(resolve, url, data)();
    expect(dataFetcher).toHaveBeenCalledTimes(1)
  });

});
