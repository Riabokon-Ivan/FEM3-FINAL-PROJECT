import axios from 'axios'

const initialState = {
  token: '',
  loggedIn: false,
  firstName: '',
  lastName: '',
  customer: {},
  registration: false,
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_LOGIN_SUCCESS': {
      const { token } = action.payload;
      return { ...state, ...action.payload };
    }

    case 'FETCH_LOGIN_ERROR':
      return state;

    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        // customer: {
        //   ...state,
        ...action.payload
        // },
      };

    case 'FETCH_CUSTOMER_DATA_SUCCESS':
      return {
        ...state,
        customer: action.payload
      };

    case 'ENTER_REGISTRATION_PAGE':
      return {
        ...state,
        registration: action.payload
      };

    case 'LEAVE_REGISTRATION_PAGE':
      return {
        ...state,
        registration: action.payload
      };

    case 'FETCH_CUSTOMER_DATA_FAILURE':
      return state;

    default: {
      return state
    }
  }
}
