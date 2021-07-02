export const arrayToObject = (arr, keyField) =>
  arr.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

export const apiAction = (url) => ({
  accessToken = null,
  data = null,
  method = 'GET',
  onLoad = null,
  onSuccess = () => {},
  onFailure = null,
  skipCallback = false,
  url = ''
}) => ({
  type: 'API',
  payload: {
    accessToken,
    data,
    method,
    onLoad,
    onSuccess,
    onFailure,
    skipCallback,
    url
  }
});

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const getViewportType = (width) => {
  let viewport = 'mobile'
  if (width >= 768) viewport = 'tablet'
  if (width >= 1024) viewport = 'large'
  if (width >= 1280) viewport = 'xlarge'
  return viewport;
}

export const debounce = (fn, ms) => {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

export const sortNestedData = (arr, parentCode = null) => {
  var sortedArr = [];
  for(var i in arr) {
    arr[i].selected = true;
    if (!parentCode) {
      if (arr[i].isParent || !arr[i].isParent && !arr[i].isChild) { 
        sortedArr.push(arr[i])
        if (arr[i].isParent) {
          const children = sortNestedData(arr, arr[i].id)
          sortedArr.push(...children)
        } 
      }
    }
    if (parentCode === arr[i].parentCode) {
      sortedArr.push(arr[i])
    }
  };
  return sortedArr;
}

export const getSelectedItems = (items) => 
  Object.values(items)
  .reduce((acc, {id, selected}) => {
    if(selected) acc.push(id);
    return acc;
  }, [])
  .join(",") 

export const generateQuerystring = (params) => Object.keys(params).map(key => key + '=' + params[key]).join('&');
