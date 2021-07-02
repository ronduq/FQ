import axios from 'axios';
import 'core-js/features/promise/finally';

const dataFetcher = async (dispatch, {data: inputData, url, method = 'GET', onFailure, onLoad, onSuccess}, resolve) => {

  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  // axios default configs
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  if (onLoad) dispatch(onLoad(true));

  return await axios
    .request({
      url,
      method,
      [dataOrParams]: inputData
    })
    .then(({ data }) => {
      if (onSuccess) dispatch(onSuccess(data, inputData));
    })
    .catch(error => {
      if (onFailure) dispatch(onFailure(error));
    })
    .finally(() => {
      if (onLoad) dispatch(onLoad(false));
      if (resolve) resolve();
    });
};

export default dataFetcher;
