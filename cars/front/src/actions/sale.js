import * as endpoints from '../constants/endpoints';

export const SALE_REQUEST = 'SALE_REQUEST';
export const SALE_SUCCESS = 'SALE_SUCCESS';
export const SALE_FAILURE = 'SALE_FAILURE';

export function sale(data, callback = () => {}) {
  return (dispatch, getState) => {
    dispatch({
      type: SALE_REQUEST,
    });

    fetch(endpoints.SALE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          dispatch(saleFailure(''));
          throw new Error(response);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        console.log('-----data', data);
        dispatch(saleSuccess(data));
        callback();
      })
      .catch(() => {
        console.log('-----error');
        dispatch(saleFailure('error'));
      });
  };
}

export function saleSuccess(data) {
  return {
    type: SALE_SUCCESS,
    data,
  };
}

export function saleFailure(error) {
  return {
    type: SALE_FAILURE,
    error,
  };
}
