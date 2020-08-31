export const ADD_WEIGHT = "ADD_WEIGHT";
export const UPDATE_WEIGHT = "UPDATE_WEIGHT";
export const REMOVE_WEIGHT = "REMOVE_WEIGHT";
export const SET_WEIGHT = "SET_WEIGHT";

import { URL } from "../../constants/firebase";
import Weight from "../../domain/weight";
import { sortBase } from "../../utils/milk";
import {login} from './auth'

export const fetchWeigths = () => {
  return async (dispatch) => {
    try {
      const token = await login()
      const response = await fetch(`${URL}weight.json?auth=${token}`);
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
      const sortedWeight = [...loadedWeight].sort(sortBase);
      dispatch({
        type: SET_WEIGHT,
        data: sortedWeight,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addWeight = (ts: number, measurement: number) => {
  return async (dispatch) => {
    const token = await login()
    const response = await fetch(`${URL}weight.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: ts,
        weight: measurement,
      }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();
    const weight = new Weight(resData.name, ts, measurement);
    dispatch({
      type: ADD_WEIGHT,
      data: weight,
    });
  };
};

export const deleteWeight = (id: string) => {
  return async (dispatch) => {
    const token = await login()
    const response = await fetch(
      `${URL}weight/${id}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch({ type: REMOVE_WEIGHT, data: id });
  };  
};

export const updateWeight = (weight: Weight) => {
  return async (dispatch) => {
    const token = await login()
    const response = await fetch(
      `${URL}weight/${weight.id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          timestamp: weight.timestamp,
          weight: weight.weight,
        })
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: UPDATE_WEIGHT,
      data: weight
    });
  };
};