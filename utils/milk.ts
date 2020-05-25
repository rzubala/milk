import Feeding from "../domain/feeding";
import Poo from '../domain/poo'

export const fetchFeedingDay = (data: Feeding[], timestamp: number) => {
  if (!data) {
    return null;
  }
  const fromDate = new Date(timestamp);
  fromDate.setHours(0, 0, 0, 0);
  const toDate = new Date(fromDate.getTime() + 24 * 60 * 60 * 1000);
  const filtered = data
    .filter((item) => item.date >= fromDate && item.date < toDate)
    .sort(sortFeeding);
  return filtered;
};

export const getPoo = (poo: Poo[], timestamp: number): undefined | Poo => {
  if (!poo || !timestamp) {
    return undefined
  }
  const ts = normalizeTimestamp(timestamp)
  return poo.find(item => item.timestamp === ts)
}

export const sortFeeding = (i1: Feeding, i2: Feeding): number => {
  if (i1.date > i2.date) {
    return -1
  }
  return 1
}

export const sortPoo = (i1: Poo, i2: Poo): number => {
  if (i1.timestamp > i2.timestamp) {
    return -1
  }
  return 1
}

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
    .forEach((element) => {
      const volume = sumMap.get(element);
      result.push(
        new Feeding(
          element.toString(),
          new Date(element + 12 * 60 * 60 * 1000),
          volume === undefined ? 0 : volume
        )
      );
    });
  return result.sort(sortFeeding);
};

export const normalizeTimestamp = (timestamp: number) => {
  const copiedDate = new Date(timestamp);
  copiedDate.setHours(0, 0, 0, 0);
  return copiedDate.getTime() + 12 * 60 * 60 * 1000
}

export const zeroPad = (num, places) => String(num).padStart(places, '0')