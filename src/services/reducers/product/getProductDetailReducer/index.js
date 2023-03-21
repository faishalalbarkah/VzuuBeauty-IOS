import { GET_PRODUCT_DETAIL } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const getProductDetailReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case GET_PRODUCT_DETAIL.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case GET_PRODUCT_DETAIL.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case GET_PRODUCT_DETAIL.FAILED:
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

export default getProductDetailReducer