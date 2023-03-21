import { UPDATE_ADDRESS } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const updateAddressReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case UPDATE_ADDRESS.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case UPDATE_ADDRESS.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case UPDATE_ADDRESS.FAILED:
            return {
                ...state,
                data: false,
                errors: action.payload.errors,
                isLoading: false
            }
        case UPDATE_ADDRESS.RESET:
            return initialState
        default:
            return state
    }
}

export default updateAddressReducer