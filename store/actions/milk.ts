export const SET_FEEDING = "SET_FEDDING";
export const ADD_FEEDING = "ADD_FEDDING";
export const UPDATE_FEEDING = "UPDATE_FEDDING";
export const DELETE_FEEDING = "DELETE_FEDDING";

import TEST_DATA from "../../data/test_data";
import Feeding from "../../domain/feeding";

export const addFeeding = (feeding: Feeding) => {
  feeding.id = feeding.date.getTime().toString()  //FIXME
  return {type: ADD_FEEDING, data: feeding}
}

export const updateFeeding = (feeding: Feeding) => {
  return {type: UPDATE_FEEDING, data: feeding}
}

export const fetchFeeding = () => {
  return async (dispatch, getState) => {    
    try {
      /*
      const response = await fetch(
        "https://https://milk-logs.firebaseio.com/feeding.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const resData = await response.json();
      const loadedFeeding: Feeding[] = [];

      for (const key in resData) {
        loadedFeeding.push(
          new Feeding(key, new Date(resData[key].date), resData[key].volume)
        );
      }
      */
     const loadedFeeding = TEST_DATA
      dispatch({
        type: SET_FEEDING,
        data: loadedFeeding,
      });
    } catch (err) {
      throw err;
    }
  };
};
