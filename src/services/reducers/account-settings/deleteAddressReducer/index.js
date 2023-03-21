import { DELETE_ADDRESS } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const deleteAddressReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case DELETE_ADDRESS.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case DELETE_ADDRESS.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case DELETE_ADDRESS.FAILED:
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

export default deleteAddressReducer