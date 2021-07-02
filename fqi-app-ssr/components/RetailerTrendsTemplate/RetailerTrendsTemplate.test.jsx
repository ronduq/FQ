/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { useRouter } from 'next/router'

import { initialRetailerRanksState, initialRetailerTrendsState, initialProducesState, initialRetailersState } from '../../reducers/initialState'
import RetailerTrendsTemplate from './RetailerTrendsTemplate';

import TrendsChart from '../TrendsChart/TrendsChart'; 

jest.mock('../../hocs/Layout', () => ({
  __esModule: true,
  default: (e) => e,
}));

jest.mock("../TrendsChart/TrendsChart", () => {
  return {
    __esModule: true,
    default: ({activeTooltipIndex, handleSetDate, selectedDate}) => {
      return <div className="mockedComponent" data-activetooltip={activeTooltipIndex} data-selecteddate={selectedDate} onClick={handleSetDate}>Mock</div>;
    },
  };
});

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { location: 'boston', retailer: 'costco' }, 
      asPath: '/retailer-trends',
      pathname: '/boston/retailers/costco/trends',
      push: mockPush,
    };
  }
}));


function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}

const fakeStore = {
  dispatch: jest.fn(),
  getState: () => ({
    produces: initialProducesState,
    retailers: initialRetailersState,
    retailerRanks: initialRetailerRanksState,
    retailerTrends: initialRetailerTrendsState,
    content: {
      retailerTrends: {
        show_view_by_dropdown: true
      },
      tooltips:{
        trend:{}
      }
    }
  }),
  subscribe: jest.fn()
};

describe('RetailerTrendsTemplate', () => {

  const props = {
    notFoundContent:{
      title: 'Not found',
      text: 'missing data'
    },
    isAnyProduceSelected: true,
    isLoading: false,
    query: {
      location: 'boston',
      retailer: 'aldi'
    },
    producesData: {
      name: 'Produces',
      items: [{isParent:true, id:'apple', selected: true}, {isParent:false, id:'banana', selected: true}, {isParent:false, id:'avocado', selected: true}],
      itemsLabels: {apple: 'All', banana: 'Banana', avocado: 'Avocado'}
    },
    selectedRetailer: 'aldi',
    trendsData:[  
      { timestamp: 1572272548000, avocado: 95, banana: 10, blueberry: 80, strawberry: 90 },
      { timestamp: 1572877348000, avocado: 60, banana: 20, blueberry: 70, strawberry: 92 }],
      compareBy: 'value',
    retailersList:{aldi: {label:'Aldi', logo:'www.logo.com'}},
    viewport: 'xlarge',
    selectAllProduces: jest.fn,
    updateProduce: jest.fn,
    setCompareBy: jest.fn,
  };


  
  it('RetailerTrendsTemplate snapshot"', () => {
    const component = renderer.create(
    <Provider store={fakeStore}>
      <RetailerTrendsTemplate {...props} />
    </Provider>, { createNodeMock } );

    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

  it('should mock click event and set activeLabel"', () => {
    const activeLabel = 1572272548000;

    const wrapper = mount(
    <Provider store={fakeStore}>
      <RetailerTrendsTemplate {...props} />
    </Provider>);

    wrapper.find('.mockedComponent').simulate('click', { activeLabel });
    expect(wrapper.find(`[data-selecteddate=${activeLabel}]`).length).toBe(1)
  });

  it('should mock click event and set activeTooltipIndex"', () => {
    const activeTooltipIndex = 0;

    const wrapper = mount(
    <Provider store={fakeStore}>
      <RetailerTrendsTemplate {...props} />
    </Provider>);

    wrapper.find('.mockedComponent').simulate('click', { activeTooltipIndex });
    expect(wrapper.find('.produceScore').at(0).text()).toBe('10') //first data point for bananas
  });

  it('should show NotFoundDisplay icon when isAnyProduceSelected is false', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <RetailerTrendsTemplate {...props} isAnyProduceSelected={false}/>
      </Provider>);
    expect(wrapper.find('NotFoundDisplay').length).toBe(1);
  });

  it('should show the loading icon when isLoading is true', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <RetailerTrendsTemplate {...props} isLoading={true}/>
      </Provider>);
    expect(wrapper.find('LoadingSpinner').length).toBe(1);
  });

})