import App from 'next/app'
import React from 'react'
import withRedux from "next-redux-wrapper";
import { Provider } from 'react-redux';
import Meta from '../components/Meta/MetaContainer'
import SvgSprite from '../components/SvgSprite/SvgSprite';

import { fetchContent } from '../actions/content';
import { generateRetailersRankQueryAndFetch } from '../actions/retailerRanks';
import { setInitialRetailers, setSelectedRetailer } from '../actions/retailers';
import { setInitialProduces, setSelectedProduce } from '../actions/producesActions';
import { setLocationAndFetchContent } from '../actions/content';

import { 
  getRetailerRanks,
} from '../selectors/index';

import { initializeStore } from '../store'

class MyApp extends App {
   static async getInitialProps({ Component, ctx }) {
    const { 
      isServer, 
      store: { dispatch, getState } , 
      query: { location, produce, produces, retailer, retailers },
      req = { headers: {host: ''}},
    } = ctx;

    const state =  getState();
    const { 
      locations: { selectedLocation }, 
      retailers: { selectedRetailer },
      produces: { selectedProduce }  
    } =  state;

    if (isServer) {
      await new Promise(resolve => {
        dispatch(fetchContent(resolve));
      });

      if (retailers) dispatch(setInitialRetailers(`${retailers},${retailer}`));
      if (produces) dispatch(setInitialProduces(produces));
    }

    if (retailer && retailer !== selectedRetailer) {
      await dispatch(setSelectedRetailer(retailer));
    }

    if (produce && produce !== selectedProduce) {
      await dispatch(setSelectedProduce(produce));
    }
    
    if (location && location !== selectedLocation.id) {
      await setLocationAndFetchContent(dispatch, location); 

      // Don't fetch on initial load, only after location change
      // Individial page will fetch on initial load if required
      if (getRetailerRanks(state).length > 0) {
        await generateRetailersRankQueryAndFetch(dispatch, getState(), location, '', retailer)
      } 
    }

    const { headers, protocol } = req;
    const { host } = headers; 
    let hostname = `${protocol}://${host}`;
    
    if (typeof window !== 'undefined') {
      hostname = window.location.origin;
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps, query: ctx.query, hostname, state: getState() };
  }

  render() {
    const { Component, pageProps, store, query, hostname, state } = this.props;
    return (
      <Provider store={store}>
        <Meta hostname={hostname} pageId={pageProps.pageId}/>
        <SvgSprite /> 
        <Component {...pageProps} query={query} />
      </Provider>
    )
  }
}

export default withRedux(initializeStore)(MyApp);

