import * as endpoints from '../constants/endpoints';

export const STATE_DUTY_REQUEST = 'STATE_DUTY_REQUEST';
export const STATE_DUTY_SUCCESS = 'STATE_DUTY_SUCCESS';
export const STATE_DUTY_FAILURE = 'STATE_DUTY_FAILURE';

export function stateDuty(data, callback = () => {}) {
  return (dispatch, getState) => {
    dispatch({
      type: STATE_DUTY_REQUEST,
    });

    fetch(endpoints.STATE_DUTY, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          dispatch(stateDutyFailure(''));
          throw new Error(response);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        console.log('-----data', data);
        dispatch(stateDutySuccess(data));
        callback();
      })
      .catch(() => {
        console.log('-----error');
        dispatch(stateDutyFailure('error'));
      });
  };
}

export function stateDutySuccess(data) {
  return {
    type: STATE_DUTY_SUCCESS,
    data,
  };
}

export function stateDutyFailure(error) {
  return {
    type: STATE_DUTY_FAILURE,
    error,
  };
}
