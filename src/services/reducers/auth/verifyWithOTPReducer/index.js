import { VERIFY_WITH_OTP } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const verifyWithOTPReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case VERIFY_WITH_OTP.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case VERIFY_WITH_OTP.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case VERIFY_WITH_OTP.FAILED:
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

export default verifyWithOTPReducer