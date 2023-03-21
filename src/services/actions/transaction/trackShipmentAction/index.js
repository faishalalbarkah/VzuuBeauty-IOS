import axios from 'axios'
import {
    API_URL,
    getData,
    setFail,
    setLoading,
    setSuccess,
    TRACK_SHIPMENT
} from '../../../../utils'

const trackShipmentAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(TRACK_SHIPMENT.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/shipping/waybill`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(TRACK_SHIPMENT.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            const errors = (error.response && error.response.data && error.response.data.errors) ? error.response.data.errors : error
            dispatch(setFail(TRACK_SHIPMENT.FAILED, errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default trackShipmentAction