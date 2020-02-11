import { GET_FILTER_PRODUCTS, FETCH_FILTER_PARAMS_SUCCESS, FILTER_TYPE, RESET_FILTERS } from '../actions/actionTypes'

export const initialState = {
  filterResults: {
    color: [],
    brand: [],
    price: [0, 700]
  },
  filterParams: {
    colors: [],
    brands: [],
  },
  filterType: ''
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FILTER_PRODUCTS: {
      return {
        ...state,
        filterResults: action.payload
      };
    }

    case FETCH_FILTER_PARAMS_SUCCESS:
      return {
        ...state,
        filterParams: {
          ...state.filterParams,
          [action.payload.filterTitle]: action.payload.params
        }
      };

    case FILTER_TYPE:
      return {
        ...state,
        filterType: action.payload
      };

    case RESET_FILTERS:
      return {
        ...state,
        filterResults: {
          color: [],
          brand: [],
          price: [0, 700]
        }
      };

    default:
      return state
  }
}
