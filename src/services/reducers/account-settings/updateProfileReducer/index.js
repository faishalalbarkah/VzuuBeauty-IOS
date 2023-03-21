import { UPDATE_PROFILE } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const updateProfileReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case UPDATE_PROFILE.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case UPDATE_PROFILE.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case UPDATE_PROFILE.FAILED:
            return {
                ...state,
                data: false,
                errors: action.payload.errors,
                isLoading: false
            }
        case UPDATE_PROFILE.RESET:
            return initialState
        default:
            return state
    }
}

export default updateProfileReducer