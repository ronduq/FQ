import * as actions from '../actions/retailerTrends';
import retailers from './retailerTrends';
import { initialRetailerTrendsState } from './initialState';

describe('retailerTrends', () => {
  
  it(`should call setRetailersTrendData and set the trend data`, () => {
    const data = {data : [{ pt01_value: 1.4713653075678812, timestamp: 1566988857356 }]};
    const updatedState = retailers(undefined, actions.setRetailersTrendData(data));
    expect(updatedState.trends).toEqual(data.data);
  });

  it(`should call setRetailerTrendsView and set the viewBy value`, () => {
    const viewBy = 'monthly'
    const updatedState = retailers(undefined, actions.setRetailerTrendsView(viewBy));
    expect(updatedState.viewBy).toEqual(viewBy);
  });

  it(`should call setRetailersTrendCompareBy and set the compareBy value`, () => {
    const compareBy = 'quality'
    const updatedState = retailers(undefined, actions.setRetailersTrendCompareBy(compareBy));
    expect(updatedState.compareBy).toEqual(compareBy);
  });

  it(`should call setRetailersTrendLoading and set the isLoading value`, () => {
    const isLoading = true;
    const updatedState = retailers(undefined, actions.setRetailersTrendLoading(isLoading));
    expect(updatedState.isLoading).toEqual(isLoading);
  });

  it(`should return default state when type no found`, () => {
    const updatedState = retailers(undefined, { type: 'NOT_FOUND', action: '' });
    expect(updatedState).toEqual(initialRetailerTrendsState);
  });

});
