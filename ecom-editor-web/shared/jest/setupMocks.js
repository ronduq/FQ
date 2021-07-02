/* eslint-disable no-console */
jest.spyOn(global.console, 'error').mockImplementation(originalFunction => e => {
  originalFunction.call(console, e);
  throw new Error(e);
})(global.console.error);

jest.spyOn(global.Date, 'now').mockImplementation(() => 1549884676054);
