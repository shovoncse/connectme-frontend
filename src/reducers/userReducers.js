import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  TOKEN_REFRESH_REQUEST,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = { tokenLoading: true }, action) => {
  switch (action.type) {
    case TOKEN_REFRESH_REQUEST:
      return { ...state, tokenLoading: true };
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case TOKEN_REFRESH_SUCCESS:
      return { ...state, tokenLoading: false, userInfo: action.payload };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case TOKEN_REFRESH_FAIL:
      return { tokenLoading: false, tokenError: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};