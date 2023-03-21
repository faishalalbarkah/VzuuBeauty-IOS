import { CONFIRM_RECEIVE } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const confirmReceiveReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case CONFIRM_RECEIVE.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case CONFIRM_RECEIVE.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case CONFIRM_RECEIVE.FAILED:
            return {
                ...state,
                data: false,
                errors: action.payload.errors,
                isLoading: false
            }
        default:
            return state
    }
}

export default confirmReceiveReducer