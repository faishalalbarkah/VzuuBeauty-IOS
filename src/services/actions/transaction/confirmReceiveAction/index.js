import axios from 'axios'
import {
    API_URL,
    CONFIRM_RECEIVE,
    getData,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const confirmReceiveAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(CONFIRM_RECEIVE.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/transactions/confirmation-received`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(CONFIRM_RECEIVE.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            const errors = (error.response && error.response.data && error.response.data.errors) ? error.response.data.errors : error
            dispatch(setFail(CONFIRM_RECEIVE.FAILED, errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default confirmReceiveAction