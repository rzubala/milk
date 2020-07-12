import Weight from '../domain/weight'
import {normalizeTimestamp} from '../utils/milk'

export const getWeightAverage = (data: Weight[], days: number) => {
    const empty = {
        average: "-",
        days: "-"
    }
    if (data === undefined || data.length < 2) {
        return empty
    }
    const to = data[0]
    const from = data.find(item => {
        return dateDiff(item, to) >= days
    })
    if (from) {
        return {
            average: weightPerDay(from, to).toFixed(0) + " g",
            days: dateDiff(from, to).toFixed(0)
        }
    }
    return empty
}

export const weightPerDay = (from: Weight, to: Weight): number => {
    const dateFrom = new Date(normalizeTimestamp(from.timestamp))
    const dateTo = new Date(normalizeTimestamp(to.timestamp))
    const days = dateDiff(from, to)
    const weightDiff = (to.weight - from.weight) * 1000    
    return Math.round(weightDiff / days)
}

const dateDiff = (weightFrom: Weight, weightTo: Weight): number => {
    const from = new Date(normalizeTimestamp(weightFrom.timestamp))
    const to = new Date(normalizeTimestamp(weightTo.timestamp))
    const diff = to.getTime() - from.getTime();
    return diff / (1000 * 3600 * 24);
}