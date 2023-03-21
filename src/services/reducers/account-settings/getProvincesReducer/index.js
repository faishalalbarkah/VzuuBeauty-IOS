import { GET_PROVINCES } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const getProvincesReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case GET_PROVINCES.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case GET_PROVINCES.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case GET_PROVINCES.FAILED:
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

export default getProvincesReducer