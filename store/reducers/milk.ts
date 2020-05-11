import Feeding from '../../domain/feeding'
import {FETCH_FEEDING, ActionData} from '../actions/milk'

const initialState = {
    feeding: []
}

export default (state = initialState, action: ActionData) => {
    switch(action.type) {
        case FETCH_FEEDING: {
            return {
                ...state,
                feeding: action.data
            }
        }
    }
    return state
}