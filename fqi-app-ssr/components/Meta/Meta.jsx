
import React, { Fragment } from 'react';
import Head from 'next/head';
import get from 'lodash.get';
import { useRouter } from 'next/router'

export default ({ hostname, pageId, socialContent, buttonContent, metadataContent, currentPageId, metaExtra, cookieBannerContent }) => {
  const pageName = metadataContent && currentPageId ? currentPageId : '';
  const {
    title = `TeakOrigin`,
    pageDescription = `${metadataContent[pageName] ? metadataContent[pageName].description : ''} ${metaExtra ? metaExtra: ''}`,
    share_texts = get(buttonContent, 'share_this_page', ''),
    image = '',
  } = get(socialContent , [pageId], {});
  const { asPath } = useRouter();

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#333333" />
        <meta name="description" content={pageDescription} />
        <link rel="stylesheet" href="https://use.typekit.net/heg1fed.css" />
        <link rel="stylesheet" href="/cookie.css" />
        <link href="/global.css" rel="stylesheet" />
        <title>{title}</title>
        <script 
          src="https://cc.cdn.civiccomputing.com/8/cookieControl-8.x.min.js" 
          id="cookie_js" 
          data-title={cookieBannerContent.title}
          data-text={cookieBannerContent.text}
          data-analytics-title={cookieBannerContent.analytics_title}
          data-analytics-text={cookieBannerContent.analytics_text}
          data-necessary-title={cookieBannerContent.necessary_title}
          data-necessary-text={cookieBannerContent.necessary_text}
          data-accept={cookieBannerContent.button}
          data-settings={cookieBannerContent.settings}
          data-accept-rec={cookieBannerContent.accept_recommended_settings}
        ></script>
        <script src="/cookie.js"></script>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${hostname}${asPath}`} />
        {image !== '' && <meta property="og:image" content={image} />}
        {pageDescription !== '' && <meta property="og:description" content={pageDescription} />}
      </Head>
    </Fragment>
  )
}
