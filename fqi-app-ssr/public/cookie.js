var script_tag = document.getElementById('cookie_js')
var contentTitle = script_tag.getAttribute("data-title");
var contentText = script_tag.getAttribute("data-text");
var contentAnalyticsTitle = script_tag.getAttribute("data-analytics-title");
var contentAnalyticsText = script_tag.getAttribute("data-analytics-text");
var contentNecessaryTitle = script_tag.getAttribute("data-necessary-title");
var contentNecessaryText = script_tag.getAttribute("data-necessary-text");
var contentAccept = script_tag.getAttribute("data-accept");
var contentSettings = script_tag.getAttribute("data-settings");
var contentAcceptSettings = script_tag.getAttribute("data-accept-rec");
          
var config = {
  apiKey: 'df6c2b827eb47e31e216f0d3df6ceb91552ef87c',
  product: 'PRO',
  text : {
    title: contentTitle,
    intro:  contentText,
    necessaryTitle : contentNecessaryTitle,
    necessaryDescription : contentNecessaryText,
    notifyTitle: contentTitle,
    notifyDescription: contentText,
    accept: contentAccept,
    settings: contentSettings,
    acceptRecommended: contentAcceptSettings,
  },
  optionalCookies: [
      {
        name: 'analytics',
        label: contentAnalyticsTitle,
        description: contentAnalyticsText,
        cookies: ['_hp2'],
        onAccept : function(){
          window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
          heap.load("1167475316");
        },
        onRevoke: function(){},
        recommendedState: true,
    }
  ],
  branding : {
    fontColor: "#FFF",
    fontSizeTitle: "1.2em",
    fontSizeIntro: "1em",
    fontSizeHeaders: "1em",
    fontSize: "0.8em",
    backgroundColor: '#00917f',
    toggleText: '#000',
    toggleColor: '#f0f0f0',
    toggleBackground: '#fff',
    buttonIcon: null,
    buttonIconWidth: "64px",
    buttonIconHeight: "64px",
    removeIcon: true,
    removeAbout: true,
  },
  initialConsentState: 'on',
  position: 'RIGHT',
  initialState: 'notify',
  notifyAccept: true,
};
CookieControl.load( config );