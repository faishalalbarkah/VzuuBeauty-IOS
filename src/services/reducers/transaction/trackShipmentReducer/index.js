import { TRACK_SHIPMENT } from '../../../../utils/actionType'

const initialState = {
    data: false,
    errors: false,
    isLoading: false
}

const trackShipmentReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case TRACK_SHIPMENT.ATTEMPT:
            return {
                ...state,
                data: false,
                errors: false,
                isLoading: action.payload.isLoading
            }
        case TRACK_SHIPMENT.SUCCEED:
            return {
                ...state,
                data: action.payload.data,
                errors: false,
                isLoading: false
            }
        case TRACK_SHIPMENT.FAILED:
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

export default trackShipmentReducer