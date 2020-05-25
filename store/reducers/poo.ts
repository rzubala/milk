import { ADD_POO, UPDATE_POO, SET_POO } from "../actions/poo";

import Poo from "../../domain/poo";

const initialState = {
  poo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POO:
      return {
        ...state,
        poo: action.data
      }
    case ADD_POO:
      const newPoo = new Poo(
        action.data.id,
        action.data.timestamp,
        action.data.count
      );
      const pooArray: Poo[] = state.poo;
      return {
        ...state,
        poo: pooArray.concat(newPoo),
      };
    case UPDATE_POO:
      const pooA: Poo[] = state.poo;
      const index = pooA.findIndex((item: Poo) => item.id === action.data.id);
      const updatedPoo = new Poo(
        action.data.id,
        action.data.timestamp,
        action.data.count
      );
      const updatedPooA: Poo[] = [...pooA];
      updatedPooA[index] = updatedPoo;
      return {
        ...state,
        poo: updatedPooA,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
