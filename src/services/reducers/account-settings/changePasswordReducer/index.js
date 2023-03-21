import { CHANGE_PASSWORD } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const changePasswordReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case CHANGE_PASSWORD.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case CHANGE_PASSWORD.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case CHANGE_PASSWORD.FAILED:
            return {
                ...state,
                data: false,
                errors: action.payload.errors,
                isLoading: false
            }
        case CHANGE_PASSWORD.RESET:
            return initialState
        default:
            return state
    }
}

export default changePasswordReducer