import axios from 'axios'
import {
    API_URL,
    getData,
    GET_ORDER_DETAIL,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getOrderDetailAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_ORDER_DETAIL.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/transactions/${req.id}`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_ORDER_DETAIL.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            const errors = (error.response && error.response.data && error.response.data.errors) ? error.response.data.errors : error
            dispatch(setFail(GET_ORDER_DETAIL.FAILED, errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getOrderDetailAction