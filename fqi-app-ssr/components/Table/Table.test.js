/* eslint-env jest */

import { mount, shallow } from 'enzyme'
import React from 'react'
import Table from './Table'
import { Provider } from 'react-redux';

describe('With Snapshot Testing', () => {

  const props = {
    // retailerRanksData: {
      ranks: {
        "0": { 
          retailerCode: "whole-foods",
          quality: 95,
          value: 3,
          perception: 6,
          qualityChampion: true,
          valueChampion: false,
          perceptionChampion: false 
        },
        "1": { 
          retailerCode: "walmart",
          quality: 93,
          value: 1,
          perception: 2,
          qualityChampion: false,
          valueChampion: true,
          perceptionChampion: false 
        },
        "2": { 
          retailerCode: "costco",
          quality: 90,
          value: 2,
          perception: 3,
          qualityChampion: false,
          valueChampion: false,
          perceptionChampion: false 
        },
        "3": { 
          retailerCode: "amazon-fresh",
          quality: 89,
          value: 5,
          perception: 4,
          qualityChampion: false,
          valueChampion: false,
          perceptionChampion: false 
        },
        "4": { 
          retailerCode: "gelsons",
          quality: 83,
          value: 6,
          perception: 5,
          qualityChampion: false,
          valueChampion: false,
          perceptionChampion: false 
        },
        "5": { 
          retailerCode: "aldi",
          quality: 76,
          value: 4,
          perception: 1,
          qualityChampion: false,
          valueChampion: false,
          perceptionChampion: true 
        },
      },
      labels: {
        retailer: 'Retailer',
        quality: 'Quality Score',
        value: 'Value Rank',
        perception: 'Perception Rank',
      },
      selected: 'quality',
      direction: 'topToBottom',
    // },
    retailersData: {
      name: 'Retailers',
      items: {
        '0': {id: 'costco', selected: true, isChild: false},
        '1': {id: 'walmart', selected: true, isChild: false},
        '2': {id: 'whole-foods', selected: true, isChild: false},
        '3': {id: 'aldi', selected: true, isChild: false},
        '4': {id: 'bristol-farms', selected: true, isChild: false},
        '5': {id: 'amazon-fresh', selected: true, isChild: false},
        '6': {id: 'gelsons', selected: true, isChild: false},
        '7': {id: 'ralphs', selected: true, isChild: false},
        '8': {id: 'stop-n-shop', selected: true, isChild: false},
        '9': {id: 'target', selected: true, isChild: false},
        '10': {id: 'trader-joes', selected: true, isChild: false},
        '11': {id: 'wegmans', selected: true, isChild: false},
      },
      allItemsSelected: true,
      itemsLabels: {},
      itemsLogos: {},
      
    }
  }

  const selectCriteria = jest.fn();
  const sortRanks = jest.fn();

  const categories = {
    quality: {
      criteria: 'quality',
      id: 'tableHeaderQualityButton',
      firstOrder: 'bottomToTop',
      secondOrder: 'topToBottom',
      champion: 'qualityChampion',
    },
    value: {
      criteria: 'value',
      id: 'tableHeaderValueButton',
      firstOrder: 'topToBottom',
      secondOrder: 'bottomToTop',
      champion: 'valueChampion',
    },
    perception: {
      criteria: 'perception',
      id: 'tableHeaderPerceptionButton',
      firstOrder: 'topToBottom',
      secondOrder: 'bottomToTop',
      champion: 'perceptionChampion',
    },
  }

  const fakeStore = {
    dispatch: jest.fn(),
    getState: () => ({
      content: {
        tooltips:{
          trend:{}
        }
      }
    }),
    subscribe: jest.fn()
  };
  
  it('Table snapshot"', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <Table {...props}/>
      </Provider>);
    
    expect(wrapper).toMatchSnapshot()
  });

  it('Sorts top to bottom', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <Table {...props} sortRanks={sortRanks} selected={'quality'} direction={'topToBottom'}/>
      </Provider>);
    const qualityButton = wrapper.find('#tableHeaderQualityButton button');
    qualityButton.simulate('click');
    expect(sortRanks).toHaveBeenCalledTimes(1);
  });

  it('Sorts bottom to top', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <Table {...props} sortRanks={sortRanks} selected={'value'} direction={'bottomToTop'}/>
      </Provider>);
    const qualityButton = wrapper.find('#tableHeaderValueButton button');
    qualityButton.simulate('click');
    expect(sortRanks).toHaveBeenCalledTimes(2);
  });

  it('Sorts top to bottom on quality', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <Table {...props} sortRanks={sortRanks} selected={'value'}/>
      </Provider>);
    const qualityButton = wrapper.find('#tableHeaderQualityButton button');
    qualityButton.simulate('click');
    expect(sortRanks).toHaveBeenCalledTimes(3);
  });

  it('Sorts top to bottom on quality', () => {

    const wrapper = mount(
      <Provider store={fakeStore}>
        <Table {...props} sortRanks={sortRanks} selected={'quality'}/>
      </Provider>);
    const qualityButton = wrapper.find('#tableHeaderPerceptionButton button');
    qualityButton.simulate('click');
    expect(sortRanks).toHaveBeenCalledTimes(4);
  });
})