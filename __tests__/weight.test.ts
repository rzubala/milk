import {weightPerDay} from '../utils/weight'
import Weight from '../domain/weight'

test('weightPerDay', () => {
    const dateFrom = new Date(2020, 5, 1, 14, 10, 0)
    const dateTo = new Date(2020, 5, 11, 11, 20, 0)
    const from = new Weight('from', dateFrom.getTime(), 4.34)
    const to = new Weight('to', dateTo.getTime(), 5.01)

    expect(weightPerDay(from, to)).toStrictEqual(67);
});
