import { GET_PROFILE } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const getProfileReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case GET_PROFILE.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case GET_PROFILE.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case GET_PROFILE.FAILED:
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

export default getProfileReducer