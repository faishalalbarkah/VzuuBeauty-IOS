import { REMOVE_FROM_CART } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const removeFromCartReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REMOVE_FROM_CART.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case REMOVE_FROM_CART.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case REMOVE_FROM_CART.FAILED:
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

export default removeFromCartReducer