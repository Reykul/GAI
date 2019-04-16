import * as endpoints from '../constants/endpoints';

export const FETCH_CARS_REQUEST = 'FETCH_CARS_REQUEST';
export const FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS';
export const FETCH_CARS_FAILURE = 'FETCH_CARS_FAILURE';

export const REGISTER_CAR_REQUEST = 'REGISTER_CAR_REQUEST';
export const REGISTER_CAR_SUCCESS = 'REGISTER_CAR_SUCCESS';
export const REGISTER_CAR_FAILURE = 'REGISTER_CAR_FAILURE';

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

export function registerCar(data, callback = () => {}) {
  return (dispatch, getState) => {
    dispatch({
      type: REGISTER_CAR_REQUEST,
    });

    fetch(endpoints.GET_CARS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          dispatch(registerCarFailure(''));
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        console.log('-----data', data);
        dispatch(registerCarSuccess(data));
        callback();
      })
      .catch(() => {
        console.log('-----error');
        dispatch(registerCarFailure('error'));
      });
  };
}

export function registerCarFailure(error) {
  return {
    type: REGISTER_CAR_FAILURE,
    error,
  };
}

export function registerCarSuccess(data) {
  return {
    type: REGISTER_CAR_SUCCESS,
    data,
  };
}
