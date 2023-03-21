import axios from 'axios'
import {
    API_URL,
    getData,
    setFail,
    setLoading,
    setSuccess,
    UPDATE_ADDRESS
} from '../../../../utils'

const updateAddressAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(UPDATE_ADDRESS.ATTEMPT))

        axios({
            method: 'PUT',
            url: `${API_URL}/shipping-addresses/${req.id}`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            if(result.data.code !== 200) throw result.data
            dispatch(setSuccess(UPDATE_ADDRESS.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            const errors = (error.response && error.response.data && error.response.data.errors) ? error.response.data.errors : error
            dispatch(setFail(UPDATE_ADDRESS.FAILED, errors))
            if(res && res.failed) res.failed(errors)
        })
    }
}

export default updateAddressAction