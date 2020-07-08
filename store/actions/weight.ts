export const ADD_WEIGHT = "ADD_WEIGHT";
export const UPDATE_WEIGHT = "UPDATE_WEIGHT";
export const REMOVE_WEIGHT = "REMOVE_WEIGHT";
export const SET_WEIGHT = "SET_WEIGHT"

import { URL } from "../../constants/firebase";
import Weight from "../../domain/weight";
import { normalizeTimestamp, sortBase } from "../../utils/milk";

export const fetchWeigths = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${URL}weight.json`);
              if (!response.ok) {
                throw new Error("something went wrong");
              }
              const resData = await response.json();
              const loadedWeight: Weight[] = [];
              for (const key in resData) {
                loadedWeight.push(
                  new Weight(key, resData[key].timestamp, resData[key].weight)
                );
              }            
              const sortedWeight = [...loadedWeight].sort(sortBase)
              dispatch({
                type: SET_WEIGHT,
                data: sortedWeight,
              });
               
        } catch (err) {
            throw err;
        }
    }
}

export const addWeight = (ts: number, measurement: number) => {    
    return async (dispatch) => {
      const timestamp = normalizeTimestamp(ts)  
      const response = await fetch(`${URL}weight.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: timestamp,
          weight: measurement
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const weight = new Weight(resData.name, timestamp, measurement);
      dispatch({
        type: ADD_WEIGHT,
        data: weight,
      });
    };
  };