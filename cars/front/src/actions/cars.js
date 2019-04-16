import * as endpoints from '../constants/endpoints';

export const FETCH_CARS_REQUEST = 'FETCH_CARS_REQUEST';
export const FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS';
export const FETCH_CARS_FAILURE = 'FETCH_CARS_FAILURE';

export const REGISTER_CAR_REQUEST = 'REGISTER_CAR_REQUEST';
export const REGISTER_CAR_SUCCESS = 'REGISTER_CAR_SUCCESS';
export const REGISTER_CAR_FAILURE = 'REGISTER_CAR_FAILURE';

export const ADD_PROXY_REQUEST = 'ADD_PROXY_REQUEST';
export const ADD_PROXY_SUCCESS = 'ADD_PROXY_SUCCESS';
export const ADD_PROXY_FAILURE = 'ADD_PROXY_FAILURE';

export function fetchCars() {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_CARS_REQUEST,
    });

    fetch(endpoints.GET_CARS)
      .then(response => {
        if (!response.ok) {
          dispatch(fetchCarsFailure(''));
          throw new Error(response);
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
          throw new Error(response);
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

export function addProxy(data, callback = () => {}) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_PROXY_REQUEST,
    });

    fetch(endpoints.ADD_PROXY, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          dispatch(addProxyFailure(''));
          throw new Error(response);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        console.log('-----data', data);
        dispatch(addProxySuccess(data));
        callback();
      })
      .catch(() => {
        console.log('-----error');
        dispatch(addProxyFailure('error'));
      });
  };
}

export function addProxySuccess(data) {
  return {
    type: ADD_PROXY_SUCCESS,
    data,
  };
}

export function addProxyFailure(error) {
  return {
    type: ADD_PROXY_FAILURE,
    error,
  };
}
