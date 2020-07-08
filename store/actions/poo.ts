export const ADD_POO = "ADD_POO";
export const UPDATE_POO = "UPDATE_POO";
export const REMOVE_POO = "REMOVE_POO";
export const SET_POO = "SET_POO"

import { URL } from "../../constants/firebase";
import Poo from "../../domain/poo";
import { normalizeTimestamp, sortBase } from "../../utils/milk";

export const fetchPoo = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${URL}poo.json`
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const resData = await response.json();
      const loadedPoo: Poo[] = [];

      for (const key in resData) {
        loadedPoo.push(
          new Poo(key, resData[key].timestamp, resData[key].count)
        );
      }
      const sortedPoo = [...loadedPoo].sort(sortBase)
      dispatch({
        type: SET_POO,
        data: sortedPoo,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addPoo = (ts: number) => {    
  return async (dispatch) => {
    const timestamp = normalizeTimestamp(ts)  
    const response = await fetch(`${URL}poo.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: timestamp,
        count: 1,
      }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();
    const poo = new Poo(resData.name, timestamp, 1);
    dispatch({
      type: ADD_POO,
      data: poo,
    });
  };
};

export const updatePoo = (poo: Poo, add: boolean) => {
  return async (dispatch) => {
    const id = poo.id;
    const timestamp = poo.timestamp;
    let count = poo.count + (add ? 1 : -1);
    if (count < 0) {
      count = 0
    }
    const response = await fetch(`${URL}poo/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: timestamp,
        count: count,
      }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    poo.count = count;
    dispatch({
      type: UPDATE_POO,
      data: poo,
    });
  };
};


