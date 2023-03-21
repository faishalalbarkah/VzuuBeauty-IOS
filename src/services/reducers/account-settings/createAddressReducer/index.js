import { CREATE_ADDRESS } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const createAddressReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case CREATE_ADDRESS.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case CREATE_ADDRESS.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case CREATE_ADDRESS.FAILED:
            return {
                ...state,
                data: false,
                errors: action.payload.errors,
                isLoading: false
            }
        case CREATE_ADDRESS.RESET:
            return initialState
        default:
            return state
    }
}

export default createAddressReducer