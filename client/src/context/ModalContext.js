
import { createContext, useReducer } from 'react';

const TOGGLE_MODAL = 'TOGGLE_MODAL';

const initialState = {
    isModalVisible: false,
};

const reducer = (state, action) => {
    switch (action.type) {
      case TOGGLE_MODAL:
        return { ...state, isModalVisible: !state.isModalVisible };
      default:
        return state;
    }
};

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleModal = () => {
        dispatch({type: TOGGLE_MODAL})
  }


  const value = {
    state,
    toggleModal
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export {ModalProvider, ModalContext};

