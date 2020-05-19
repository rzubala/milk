import TEST_DATA from "../data/test_data";
import Feeding from "../domain/feeding";
import { groupPerDay } from '../utils/milk'

test('groupByDay', () => {
    const date1 = new Date(2020, 4, 9, 0, 0, 0)
    const date2 = new Date(2020, 4, 10, 0, 0, 0)
    const result: Feeding[] = [
        new Feeding(date1.getTime().toString(), date1, 210),
        new Feeding(date2.getTime().toString(), date2, 225),
    ]
    expect(groupPerDay(TEST_DATA)).toStrictEqual(result);
});