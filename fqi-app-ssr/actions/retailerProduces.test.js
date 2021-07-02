
import * as retailerProducesActions from './retailerProduces';
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
  const getState = () => ({
    locations: {
      selectedLocation: {
        id: "boston", 
        label: "Boston"
      }
    },
    retailers: {
      items: [{
        retailerCode:"aldi",
        retailerName:"Aldi",
        id:"aldi",
        selected:true
      }],
      selectedRetailer: 'aldi'
    },
    retailerRanks: {
      selected: '',
      selected:"quality",
      direction:"topToBottom"
    },
    retailerProduces: {
      sortDirection: 'ASC'
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
  })


  it(`should call generateRetailersProduceQueryAndFetch and then call dispatch`, async () => {
    const location = 'boston';
    const retailerCode = 'aldi';
    retailerProducesActions.generateRetailersProduceQueryAndFetch(dispatch, getState(), location, retailerCode)
    expect(dispatch).toHaveBeenCalledTimes(1)
  });

  it(`should call setRetailerProducesDirectionAndFetch and then call dispatch`, async () => {
    const sortDirection = 'ASC';
    retailerProducesActions.setRetailerProducesDirectionAndFetch(sortDirection)(dispatch, getState)
    expect(dispatch).toHaveBeenCalledTimes(2)
  });

});
