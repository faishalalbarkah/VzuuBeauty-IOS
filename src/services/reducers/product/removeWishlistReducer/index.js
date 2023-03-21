import { REMOVE_WISHLIST } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const removeWishlistReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REMOVE_WISHLIST.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case REMOVE_WISHLIST.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case REMOVE_WISHLIST.FAILED:
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

export default removeWishlistReducer