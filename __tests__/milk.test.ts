import TEST_DATA from "../data/test_data";
import Feeding from "../domain/feeding";
import { groupPerDay } from '../store/actions/milk'

test('groupByDay', () => {
    const result: Feeding[] = [
        new Feeding(new Date(2020, 4, 9, 0, 0, 0), 210),
        new Feeding(new Date(2020, 4, 10, 0, 0, 0), 225),
    ]
    expect(groupPerDay(TEST_DATA)).toStrictEqual(result);
});