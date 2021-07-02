
import * as retailerTrends from './retailerTrends';

describe('retailerTrends Actions ', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const dispatch = jest.fn();
  const getState = () => ({
    locations: {
      selectedLocation: {
        id: 'boston',
        label: 'Boston, MA'
      }
    },
    retailers: {
      selectedRetailer: 'aldi'
    },
    retailerTrends: {
      compareBy: 'value',
      viewBy: 'weekly',
    }
  });

  it(`should call generateRetailerTrendsQueryAndFetch and dispatch thunk calls `, async () => {
    const location = 0;
    const retailer = true;
    retailerTrends.generateRetailerTrendsQueryAndFetch(dispatch, getState(), location, retailer);
    expect(dispatch).toHaveBeenCalledTimes(1)
  });

  it(`should call generateRetailerTrendsQueryAndFetch and get location and retailer from state when not passed `, async () => {
    retailerTrends.generateRetailerTrendsQueryAndFetch(dispatch, getState(), null, null);   
    expect(dispatch).toHaveBeenCalledTimes(1)
  });

  it(`should call setRetailersTrendData and generate action data`, async () => {
    const data = { data: [{test: 1},{test:2}]}
    expect(retailerTrends.setRetailersTrendData(data)).toEqual( {"payload": data, "type": "SET_RETAILER_TRENDS"})
  });

  it(`should call setRetailersTrendLoading and generate action data`, async () => {
    const isLoading = true
    expect(retailerTrends.setRetailersTrendLoading(isLoading)).toEqual( {"payload": {isLoading}, "type": "SET_RETAILER_TRENDS_LOADING"})
  });

  it(`should call setCompareByThunk and dispatch thunk calls `, async () => {
    const compareBy = 'quality'
    retailerTrends.setCompareByThunk(compareBy)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch.mock.calls[0][0]).toEqual(retailerTrends.setRetailersTrendCompareBy(compareBy))
  });

  it(`should call setRetailerTrendsViewThunk and dispatch thunk calls `, async () => {
    const viewBy = 'monthly'
    retailerTrends.setRetailerTrendsViewThunk(viewBy)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch.mock.calls[0][0]).toEqual(retailerTrends.setRetailerTrendsView(viewBy))
  });

});
