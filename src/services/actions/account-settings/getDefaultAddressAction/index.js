import axios from 'axios'
import {
    API_URL,
    getData,
    GET_DEFAULT_ADDRESS,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getDefaultAddressAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_DEFAULT_ADDRESS.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/shipping-addresses?default=true`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_DEFAULT_ADDRESS.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(GET_DEFAULT_ADDRESS.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getDefaultAddressAction