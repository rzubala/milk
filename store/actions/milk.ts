export const FETCH_FEEDING = "FETCH_FEDDING";

import TEST_DATA from "../../data/test_data";
import Feeding from "../../domain/feeding";

export const fetchFeeding = () => {
  const data = TEST_DATA;
  return { type: FETCH_FEEDING, feeding: groupPerDay(data) };
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
        new Feeding(new Date(element), volume === undefined ? 0 : volume)
      );
    });
  return result;
};
