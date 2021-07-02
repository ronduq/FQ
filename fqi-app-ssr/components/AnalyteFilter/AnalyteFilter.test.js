/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';
import { mount } from 'enzyme'

import AnalyteFilter from './AnalyteFilter'

const fakeStore = {
  dispatch: jest.fn(),
  getState: () => ({
    produceInfo: {
      info: {
        analytes: [ 
        {score: 99.75, recentScan: 113, usda: 73, status: "Green", id: "sucrose"},
        {score: 98, recentScan: 123, usda: 70, status: "Green", id: "fructose"},
        {score: 92.5, recentScan: 119, usda: 77, status: "Green", id: "glucose"},
        {score: 65.25, recentScan: 46, usda: 69, status: "Red", id: "vitaminc"},
        {score: 94, recentScan: 117, usda: 70, status: "Green", id: "water"},
        ]
      },
      labels: [
        {label: "Water", id: "water"},
        {label: "Glucose", id: "glucose"},
        {label: "Sucrose", id: "sucrose"},
        {label: "Fructose", id: "fructose"},
        {label: "Citric Acid", id: "citric"},
      ]
    }, 
    producesData: {
      allItemsSelected: true,
      items: [
        {produceCode: "apple", produceName: "Apple", isParent: true, isChild: false, colour: "#00405C"},
        {produceCode: "apple-braeburn", produceName: "Apple Braeburn", isParent: false, isChild: true, parentCode: "apple"},
        {produceCode: "apple-fuji", produceName: "Apple Fuji", isParent: false, isChild: true, parentCode: "apple"},
        {produceCode: "apple-gala", produceName: "Apple Gala", isParent: false, isChild: true, parentCode: "apple"},
      ],
      itemsInfo: [
        {id: "apple", water: "", sucrose: "", vitaminc: "", label: "All Apples"},
        {id: "apple-braeburn", water: "Water in breaburn apples  text", sucrose: "sucrose in breaburn apples  text", vitaminc: "vitaminc in breaburn apples  text", label: "Braeburn Apples"},
        {id: "apple-fuji", water: "", sucrose: "", vitaminc: "", label: "Fuji Apples"},
        {id: "apple-gala", water: "", sucrose: "", vitaminc: "", label: "Gala Apples"},
        {id: "apple-honey-crisp", water: "", sucrose: "", vitaminc: "", label: "Honey Crisp Apples"},
        {id: "grape-green", water: "", sucrose: "", vitaminc: "", label: "Green Grapes"},
        {id: "grape-red", water: "", sucrose: "", vitaminc: "", label: "Red Grapes"},
        {id: "banana", water: "", sucrose: "", vitaminc: "", label: "Bananas"},
      ]
    },
    content: {
      usdaTexts: {
        green_title: 'test',
        green: 'test',
      }
    },
    content: {
      tooltips:{
        trend:{}
      }
    }
    // viewport: PropTypes.string,
  }),
  subscribe: jest.fn()
};

describe('AnalyteFilter', () => {

  const props = {
    content: {
      analyte_breakdown: 'test'
    },
    produceInfo: {
      info: {
        analytes: [ 
        {score: 99.75, recentScan: 113, usda: 73, status: "Green", id: "sucrose"},
        {score: 98, recentScan: 123, usda: 70, status: "Green", id: "fructose"},
        {score: 92.5, recentScan: 119, usda: 77, status: "Green", id: "glucose"},
        {score: 65.25, recentScan: 46, usda: 69, status: "Red", id: "vitaminc"},
        {score: 94, recentScan: 117, usda: 70, status: "Green", id: "water"},
        ]
      },
      labels: [
        {label: "Water", id: "water"},
        {label: "Glucose", id: "glucose"},
        {label: "Sucrose", id: "sucrose"},
        {label: "Fructose", id: "fructose"},
        {label: "Citric Acid", id: "citric"},
      ]
    }, 
    producesData: {
      allItemsSelected: true,
      items: [
        {produceCode: "apple", produceName: "Apple", isParent: true, isChild: false, colour: "#00405C"},
        {produceCode: "apple-braeburn", produceName: "Apple Braeburn", isParent: false, isChild: true, parentCode: "apple"},
        {produceCode: "apple-fuji", produceName: "Apple Fuji", isParent: false, isChild: true, parentCode: "apple"},
        {produceCode: "apple-gala", produceName: "Apple Gala", isParent: false, isChild: true, parentCode: "apple"},
      ],
      itemsInfo: [
        {id: "apple", water: "", sucrose: "", vitaminc: "", label: "All Apples"},
        {id: "apple-braeburn", water: "Water in breaburn apples  text", sucrose: "sucrose in breaburn apples  text", vitaminc: "vitaminc in breaburn apples  text", label: "Braeburn Apples"},
        {id: "apple-fuji", water: "", sucrose: "", vitaminc: "", label: "Fuji Apples"},
        {id: "apple-gala", water: "", sucrose: "", vitaminc: "", label: "Gala Apples"},
        {id: "apple-honey-crisp", water: "", sucrose: "", vitaminc: "", label: "Honey Crisp Apples"},
        {id: "grape-green", water: "", sucrose: "", vitaminc: "", label: "Green Grapes"},
        {id: "grape-red", water: "", sucrose: "", vitaminc: "", label: "Red Grapes"},
        {id: "banana", water: "", sucrose: "", vitaminc: "", label: "Bananas"},
      ]
    },
    // viewport: PropTypes.string,
  };

  it('AnalyteFilter snapshot"', () => {
    const component = renderer.create(
    <Provider store={fakeStore}>
      <AnalyteFilter {...props} />
    </Provider>);
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

  it('AnalyteFilter snapshot', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <AnalyteFilter {...props} />
      </Provider>
    );

    setTimeout(() => {
      const button = wrapper.find('AnalyteFilterListItem0');
    button.find('button').simulate('click');
    expect(props.handleClick).toHaveBeenCalledOnce();
    }, 100);
    
  });

  

})