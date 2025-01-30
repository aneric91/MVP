import { createStore } from 'redux';

// Réducteur de base
const initialState = {
  user: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
