import Feeding from '../../domain/feeding'
import {SET_FEEDING, ADD_FEEDING, UPDATE_FEEDING, DELETE_FEEDING} from '../actions/milk'

const initialState = {
    feeding: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_FEEDING: {
            return {
                ...state,
                feeding: action.data,
            }
        }
        case ADD_FEEDING: {
            const newFeeding = new Feeding(action.data.id, action.data.date, action.data.volume)
            const rawFeeding: Feeding[] = state.feeding
            return {
                ...state,
                feeding: rawFeeding.concat(newFeeding)
            }
        }
        case UPDATE_FEEDING: {
            const rawFeeding: Feeding[] = state.feeding
            const index = rawFeeding.findIndex((item: Feeding) => item.id === action.data.id)
            const updatedFeeding = new Feeding(action.data.id, action.data.date, action.data.volume)
            const updatedRawFeeding: Feeding[] = [...rawFeeding]
            updatedRawFeeding[index] = updatedFeeding
            return {
                ...state,
                feeding: updatedRawFeeding
            }
        }
        case DELETE_FEEDING: {
            return {
                ...state,
                feeding: state.feeding.filter((item: Feeding) => item.id !== action.data)
            }
        }
    }
    return state
}