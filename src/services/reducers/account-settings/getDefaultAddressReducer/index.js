import { GET_DEFAULT_ADDRESS } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const getDefaultAddressReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case GET_DEFAULT_ADDRESS.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case GET_DEFAULT_ADDRESS.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case GET_DEFAULT_ADDRESS.FAILED:
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

export default getDefaultAddressReducer