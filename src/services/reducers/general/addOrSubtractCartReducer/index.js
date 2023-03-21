import { ADD_OR_SUBTRACT_CART } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const addOrSubtractCartReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case ADD_OR_SUBTRACT_CART.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case ADD_OR_SUBTRACT_CART.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case ADD_OR_SUBTRACT_CART.FAILED:
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

export default addOrSubtractCartReducer