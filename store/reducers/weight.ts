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
    case UPDATE_WEIGHT:
      const rawWeights: Weight[] = state.weights;
      const index = rawWeights.findIndex(
        (item: Weight) => item.id === action.data.id
      );
      const updatedWeight = new Weight(
        action.data.id,
        action.data.timestamp,
        action.data.weight
      );
      const updatedRawWeights: Weight[] = [...rawWeights];
      updatedRawWeights[index] = updatedWeight;
      return {
        ...state,
        weights: updatedRawWeights,
      };
    case REMOVE_WEIGHT:
      return {
        ...state,
        weights: state.weights.filter(
          (item: Weight) => item.id !== action.data
        ),
      };
    default:
      return {
        ...state,
      };
  }
};
