import * as types from './types';
import {
  FETCH_LIMIT,
  TEST_SEARCH_URL,
} from '../utils/constants';
import requestHandler from '../utils/api/requestHandler';

const updateStore = (type, value) =>
  ({
    type,
    value,
  });

export const onClearTextSearchResults = () =>
  (dispatch) => {
    dispatch(updateStore(types.ON_CLEAR_TEXT_SEARCH_RESULTS));
  };


export const handleOnSetSelectedResult = (index, data) =>
  (dispatch) => {
    dispatch(updateStore(types.ON_SET_SELECTED_FILTERS_SUCCESS, { index, data }));
  };


export function handleTextSearch(value) {
  const reqObj = {
    maxResults: FETCH_LIMIT,
    part: 'snippet',
    q: value,
    type: 'video',
  };

  return (dispatch) => {
    dispatch(updateStore(types.ON_SET_TEXT_SEARCH_RESULTS_STATUS, { isInProgress: true }));
    requestHandler(TEST_SEARCH_URL, 'GET', { params: reqObj }, false).promise
      .then((response) => {
        dispatch(updateStore(types.ON_SET_TEXT_SEARCH_RESULTS_SUCCESS, {
          results: response.data.items,
        }));
        dispatch(handleOnSetSelectedResult(0, response.data.items[0]));
        dispatch(updateStore(types.ON_SET_TEXT_SEARCH_RESULTS_STATUS, { isInProgress: false }));
      })

      .catch((error) => {
        dispatch(updateStore(types.ON_SET_TEXT_SEARCH_RESULTS_FAILED, error));
        dispatch(updateStore(types.ON_SET_TEXT_SEARCH_RESULTS_STATUS, { isInProgress: false }));
      });
  };
}

export const onClearSelectedResult = () =>
  ({
    type: types.ON_CLEAR_SELECTED_FILTERS,
  }
  );
