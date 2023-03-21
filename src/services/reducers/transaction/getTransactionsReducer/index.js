import { GET_TRANSACTIONS } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const getTransactionsReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case GET_TRANSACTIONS.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case GET_TRANSACTIONS.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case GET_TRANSACTIONS.FAILED:
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

export default getTransactionsReducer