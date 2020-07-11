import {
  SET_WEIGHT,
  UPDATE_WEIGHT,
  REMOVE_WEIGHT,
  ADD_WEIGHT,
} from "../actions/weight";

import Weight from "../../domain/weight";

const initialState = {
  weights: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WEIGHT:
      return {
        ...state,
        weights: action.data,
      };
    case ADD_WEIGHT:
      const newWeight = new Weight(
        action.data.id,
        action.data.timestamp,
        action.data.weight
      );
      const weightArray: Weight[] = state.weights;
      return {
        ...state,
        weights: weightArray.concat(newWeight),
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
