import { GET_SUBDISTRICTS } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const getSubdistrictsReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case GET_SUBDISTRICTS.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case GET_SUBDISTRICTS.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case GET_SUBDISTRICTS.FAILED:
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

export default getSubdistrictsReducer