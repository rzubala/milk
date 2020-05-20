import Feeding from "../domain/feeding";

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

export const sortFeeding = (i1: Feeding, i2: Feeding): number => {
  if (i1.date > i2.date) {
    return 1
  }
  return -1
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
    .sort()
    .forEach((element) => {
      const volume = sumMap.get(element);
      result.push(
        new Feeding(
          element.toString(),
          new Date(element),
          volume === undefined ? 0 : volume
        )
      );
    });
  return result;
};

export const zeroPad = (num, places) => String(num).padStart(places, '0')