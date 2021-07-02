
import * as contentActions from './content';
import { setProducesContent, fetchProduceData, selectAllProducesThunk } from './producesActions';
import { setRetailersContent, fetchRetailersData, selectAllRetailersThunk } from './retailers';
import { setLocations, setSelectedLocation } from './locations';
import { setRetailersTable } from  './retailerRanks';

jest.mock('./producesActions', () => ({
  setProducesContent: jest.fn(),
  selectAllProducesThunk: jest.fn(),
  fetchProduceData: jest.fn().mockReturnValueOnce(Promise.resolve())
}));

jest.mock('./retailers', () => ({
  setRetailersContent: jest.fn(),
  selectAllRetailersThunk: jest.fn(),
  fetchRetailersData: jest.fn().mockReturnValueOnce(Promise.resolve())
}));

jest.mock('./locations', () => ({
  setLocations: jest.fn(),
  setSelectedLocation: jest.fn(),
}));

jest.mock('./retailerRanks', () => ({
  setRetailersTable: jest.fn(),
}));

describe('Content Actions ', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const dispatch = jest.fn();

  it(`should call setContent `, async () => {
    const data = {
      data:{ 
        produce: [{id: "apples", label: "All Apples", image: ""}],
        retailers: [{id: "walmart", label: "Walmart", logo: "http://www.image.com"}],
        locations: [{id: "boston", label: "Boston"}, {id: "los-angeles", label: "Los Angeles"}],
        footer: [{id: "test1", label: "www.test1.com"}, {id: "test2", label: "www.test2.com"}],
        retailer_profile: [{retailer_highlights_title: "Retailer Highlights"}],
        retailers_table: [{id: "boston", label: "Boston"}, {id: "los-angeles", label: "Los Angeles"}],
        retailer_trends: [{show_view_by_dropdown: false}],
      }
    };

    contentActions.setContent(data)(dispatch);

    expect(setProducesContent).toHaveBeenCalledWith(data.data.produce)
    expect(setRetailersContent).toHaveBeenCalledWith(data.data.retailers)
    expect(setLocations).toHaveBeenCalledWith(data.data.locations)
    expect(setRetailersTable).toHaveBeenCalledWith(data.data.retailers_table);
    expect(dispatch.mock.calls[4][0]).toEqual({payload: {retailerProfile: data.data.retailer_profile}, type: 'SET_RETAILER_PROFILE_CONTENT'} )
    expect(dispatch.mock.calls[5][0]).toEqual({payload: {footer: data.data.footer}, type: 'SET_FOOTER_CONTENT'} )
    expect(dispatch.mock.calls[6][0]).toEqual({payload: {retailerTrends: data.data.retailer_trends}, type: 'SET_RETAILER_TRENDS_CONTENT'} )
    expect(dispatch.mock.calls[7][0]).toEqual({payload:{}, type: 'CONTENT_FETCHED'});
    
  });

  it(`should call setContent and not call functions when data is empty`, async () => {
    const data = {
      data:{}
    };

    contentActions.setContent(data)(dispatch);
    
    expect(setProducesContent).not.toHaveBeenCalled()
    expect(setRetailersContent).not.toHaveBeenCalledWith()
    expect(setLocations).not.toHaveBeenCalledWith()
    expect(setRetailersTable).not.toHaveBeenCalledWith()
    expect(dispatch.mock.calls[0][0]).toEqual({payload:{}, type: 'CONTENT_FETCHED'});
  });

  it(`should call setLocationAndFetchContent then dispatch actions`, async () => {
    const location = 'boston';
    contentActions.setLocationAndFetchContent(dispatch, location);
    expect(setSelectedLocation).toHaveBeenCalledWith(location)
    expect(dispatch).toHaveBeenCalledTimes(3)
  });

  it(`should call resetFiltersThunk then dispatch actions`, async () => {
    const location = 'boston';
    contentActions.resetFiltersThunk()(dispatch);
    expect(selectAllProducesThunk).toHaveBeenCalledWith(true, true); 
    expect(selectAllRetailersThunk).toHaveBeenCalledWith(true, true)
  });

});
