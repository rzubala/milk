import Feeding from '../../domain/feeding'
import {FETCH_FEEDING, FETCH_FEEDING_DAY, ActionData} from '../actions/milk'

const initialState = {
    feeding: [],
    rawFeeding: [],
    dailyFeeding: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_FEEDING: {
            return {
                ...state,
                feeding: action.data,
                rawFeeding: action.rawData
            }
        }
        case FETCH_FEEDING_DAY: {
            const modifiedDailyFeeding = {...state.dailyFeeding}
            modifiedDailyFeeding[action.date] = action.data
            return {
                ...state,
                dailyFeeding: modifiedDailyFeeding
            }
        }
    }
    return state
}