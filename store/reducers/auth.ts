import {LOGIN} from '../actions/auth'

const initialState = {
    token: null
}

interface AuthAction {
    type: string;
    token: string;
  }

export default (state = initialState, action: AuthAction) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state
    }
}