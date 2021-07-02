
import * as retailers from './retailers';
import { generateRetailersRankQueryAndFetch } from './retailerRanks';

jest.mock('./retailerRanks', () => ({
  generateRetailersRankQueryAndFetch: jest.fn(),
}));

describe('Produce Actions ', () => {

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
    }
  });

  it(`should call updateProduceThunk and dispatch thunk calls `, async () => {
    const produceId = 0;
    const check = true;
    const parentCode = 'apple';
    const isParent = false;
    retailers.updateRetailerThunk(produceId, check, parentCode, isParent)(dispatch, getState);
   
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(generateRetailersRankQueryAndFetch).toHaveBeenCalledTimes(1)
  });

  it(`should call selectAllProducesThunk and dispatch thunk calls `, async () => {
    const status = true;

    retailers.selectAllRetailersThunk(status, false)(dispatch, getState);
   
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(generateRetailersRankQueryAndFetch).toHaveBeenCalledTimes(1)
  });

  it(`should call selectAllProducesThunk and not call retailerRank location change is true`, async () => {
    const status = true;

    retailers.selectAllRetailersThunk(status, true)(dispatch, getState);
   
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(generateRetailersRankQueryAndFetch).not.toHaveBeenCalled()
  });

});
