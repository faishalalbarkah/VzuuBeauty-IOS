import { GET_ORDER_DETAIL } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const getOrderDetailReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case GET_ORDER_DETAIL.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case GET_ORDER_DETAIL.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case GET_ORDER_DETAIL.FAILED:
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

export default getOrderDetailReducer