import {
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_FAILURE,
  REGISTER_CAR_SUCCESS,
} from '../actions/cars';

const INITIAL_STATE = {
  data: [],
  isFetching: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CARS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_CARS_SUCCESS:
      return { ...state, data: action.data, isFetching: false };

    case REGISTER_CAR_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.data],
      };

    case FETCH_CARS_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
