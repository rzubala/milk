import TEST_DATA from "../data/test_data";
import Feeding from "../domain/feeding";
import { groupPerDay, fetchFeedingDay } from '../utils/milk'

test('groupByDay', () => {
    const date1 = new Date(2020, 4, 9, 0, 0, 0)
    const date2 = new Date(2020, 4, 10, 0, 0, 0)
    const result: Feeding[] = [
        new Feeding(date1.getTime().toString(), date1, 210),
        new Feeding(date2.getTime().toString(), date2, 225),
    ]
    expect(groupPerDay(TEST_DATA)).toStrictEqual(result);
});

test('sort', () => {
    const date = new Date(2020, 4, 9, 0, 0, 0)
    
    const sorted: Feeding[] = [
        new Feeding("3", new Date(2020, 4, 9, 13, 55, 0), 80),            
        new Feeding("2", new Date(2020, 4, 9, 9, 12, 0), 70),
        new Feeding("1", new Date(2020, 4, 9, 3, 24, 0), 60), 
    ]

    expect(fetchFeedingDay(TEST_DATA, date.getTime())).toStrictEqual(sorted);
})