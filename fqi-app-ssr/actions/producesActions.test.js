
import * as producesActions from './producesActions';
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
    },
    retailerRanks: {
      selected: ''
    },
    retailerProduces: {
      sortDirection: 'ASC'
    }
  });

  it(`should call updateProduceThunk and dispatch thunk calls `, async () => {
    const produceId = 0;
    const check = true;
    const parentCode = 'apple';
    const isParent = false;
    producesActions.updateProduceThunk(produceId, check, parentCode, isParent)(dispatch, getState);
   
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(generateRetailersRankQueryAndFetch).toHaveBeenCalledTimes(1)
  });

  it(`should call selectAllProducesThunk and dispatch thunk calls `, async () => {
    const status = true;

    producesActions.selectAllProducesThunk(status, false)(dispatch, getState);
   
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(generateRetailersRankQueryAndFetch).toHaveBeenCalledTimes(1)
  });

  it(`should call selectAllProducesThunk and not call retailerRank location change is true`, async () => {
    const status = true;

    producesActions.selectAllProducesThunk(status, true)(dispatch, getState);
   
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(generateRetailersRankQueryAndFetch).not.toHaveBeenCalled()
  });

  it(`should call updateProduceTrendsThunk and dispatch thunk calls `, async () => {
    const retailerId = 0;
    const checked = true;

    producesActions.updateProduceTrendsThunk(retailerId, checked)(dispatch, getState);
   
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch.mock.calls[0][0]).toEqual(producesActions.updateProduce(retailerId, checked))
    expect(dispatch.mock.calls[1][0]).toEqual(producesActions.selectAllProducesCheckbox())
  });

});
