
import axios from 'axios';
import dataFetcher from './dataFetcher';

describe('Content Actions ', () => {
  let axiosRequestMock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    axiosRequestMock = jest.spyOn(axios, 'request');
  });

  const dispatch = jest.fn();
  const onSuccess = jest.fn();
  const onFailure = jest.fn();
  const onLoad = jest.fn();
  const resolve = jest.fn();
  const data = [{id: "boston", label: "Boston"}, {id: "los-angeles", label: "Los Angeles"}];

  it(`should call dataFetcher and dispatch onLoad & onSuccess function`, async () => {
    axiosRequestMock.mockReturnValueOnce(Promise.resolve({ data }));

    await dataFetcher(dispatch, {url: 'http://www.test.com', onSuccess, onLoad }, resolve);
    expect(onSuccess.mock.calls[0][0]).toEqual(data)
    expect(onLoad).toHaveBeenCalledTimes(2)
    expect(resolve).toHaveBeenCalled();
  });

  it(`should call dataFetcher and pass without calling the callback`, async () => {
    axiosRequestMock.mockReturnValueOnce(Promise.resolve({ data }));

    await dataFetcher(dispatch, {url: 'http://www.test.com' }, resolve);
    expect(dispatch).toHaveBeenCalledTimes(0)
    expect(resolve).toHaveBeenCalled();
  });

  it(`should call dataFetcher and dispatch onFailure function`, async () => {
    axiosRequestMock.mockReturnValueOnce(Promise.reject({ data }));

    await dataFetcher(dispatch, {url: 'http://www.test.com', onFailure }, resolve);
    expect(onSuccess).not.toHaveBeenCalled()
    expect(onFailure.mock.calls[0][0]).toEqual({data})
    expect(resolve).toHaveBeenCalled();
  });

  it(`should call dataFetcher and fail without calling the callback`, async () => {
    axiosRequestMock.mockReturnValueOnce(Promise.reject({ data }));

    await dataFetcher(dispatch, {url: 'http://www.test.com' }, resolve);
    expect(dispatch).toHaveBeenCalledTimes(0)
    expect(resolve).toHaveBeenCalled();
  });

});
