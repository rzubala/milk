export const SET_FEEDING = "SET_FEDDING";
export const ADD_FEEDING = "ADD_FEDDING";
export const UPDATE_FEEDING = "UPDATE_FEDDING";
export const DELETE_FEEDING = "DELETE_FEDDING";

import { URL } from "../../constants/firebase";
import Feeding from "../../domain/feeding";
import { sortFeeding } from '../../utils/milk'

export const addFeeding = (feeding: Feeding) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}feeding.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: feeding.date.getTime(),
        volume: feeding.volume,
      }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();
    feeding.id = resData.name;
    dispatch({
      type: ADD_FEEDING,
      data: feeding,
    });
  };
};

export const deleteFeeding = (id: string) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `${URL}feeding/${id}.json`,
      {
        method: "DELETE"
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch({ type: DELETE_FEEDING, data: id });
  };  
};

export const updateFeeding = (feeding: Feeding) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `${URL}feeding/${feeding.id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          timestamp: feeding.date.getTime(),
          volume: feeding.volume,
        })
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: UPDATE_FEEDING,
      data: feeding
    });
  };
};

export const fetchFeeding = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${URL}feeding.json`
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const resData = await response.json();
      const loadedFeeding: Feeding[] = [];

      for (const key in resData) {
        loadedFeeding.push(
          new Feeding(key, new Date(resData[key].timestamp), resData[key].volume)
        );
      }
      const sortedFeeding = [...loadedFeeding].sort(sortFeeding)
      dispatch({
        type: SET_FEEDING,
        data: sortedFeeding,
      });
    } catch (err) {
      throw err;
    }
  };
};
