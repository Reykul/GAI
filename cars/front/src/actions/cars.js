import * as endpoints from '../constants/endpoints';
export const FETCH_CARS_REQUEST = 'FETCH_CARS_REQUEST';
export const FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS';
export const FETCH_CARS_FAILURE = 'FETCH_CARS_FAILURE';

export function fetchCars() {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_CARS_REQUEST,
    });

    fetch(endpoints.GET_CARS)
      .then(response => {
        if (!response.ok) {
          dispatch(fetchCarsFailure(''));
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        console.log('-----data', data);
        dispatch(fetchCarsSuccess(data));
      })
      .catch(() => {
        console.log('-----error');
        dispatch(fetchCarsFailure('error'));
      });
  };
}

export function fetchCarsSuccess(data) {
  return {
    type: FETCH_CARS_SUCCESS,
    data,
  };
}

export function fetchCarsFailure(error) {
  return {
    type: FETCH_CARS_FAILURE,
    error,
  };
}

// export function registerCar()
