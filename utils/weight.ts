import Weight from '../domain/weight'
import {normalizeTimestamp} from '../utils/milk'

export const weightPerDay = (from: Weight, to: Weight): number => {
    const dateFrom = new Date(normalizeTimestamp(from.timestamp))
    const dateTo = new Date(normalizeTimestamp(to.timestamp))
    const days = dateDiff(dateFrom, dateTo)
    const weightDiff = (to.weight - from.weight) * 1000
    return Math.round(weightDiff / days)
}

const dateDiff = (from: Date, to: Date): number => {
    const diff = to.getTime() - from.getTime();
    return diff / (1000 * 3600 * 24);
}