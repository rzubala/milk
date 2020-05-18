export const FETCH_FEEDING = "FETCH_FEDDING";
export const FETCH_FEEDING_DAY = "FETCH_FEDDING_DAY";

import TEST_DATA from "../../data/test_data";
import Feeding from "../../domain/feeding";

export interface ActionData {
  type: string
  data: any,
  date: number
}

export const fetchFeedingDay = (date) => {
  const data = TEST_DATA;
  const fromDate = new Date(date);
  fromDate.setHours(0, 0, 0, 0);
  const toDate = new Date(fromDate.getTime() + (24 * 60 * 60 * 1000));
  const filtered = data.filter(item => item.date >= fromDate && item.date < toDate)
  return {type: FETCH_FEEDING_DAY, data: filtered}
}

export const fetchFeeding = () => {
  const data = TEST_DATA;
  return { type: FETCH_FEEDING, data: groupPerDay(data), rawData: data };
};

export const groupPerDay = (data: Feeding[]) => {
  const sumMap = new Map<number, number>();
  data.forEach((item) => {
    const date = item.date;
    const copiedDate = new Date(date.getTime());
    copiedDate.setHours(0, 0, 0, 0);
    let resItem = sumMap.get(copiedDate.getTime());
    if (resItem === undefined) {
      resItem = 0;
    }
    resItem += item.volume;
    sumMap.set(copiedDate.getTime(), resItem);
  });

  const result: Feeding[] = [];
  Array.from(sumMap.keys())
    .sort()
    .forEach((element) => {
      const volume = sumMap.get(element);
      result.push(
        new Feeding(element.toString(), new Date(element), volume === undefined ? 0 : volume)
      );
    });
  return result;
};
