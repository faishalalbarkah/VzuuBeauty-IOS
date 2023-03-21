import axios from 'axios'
import {
    API_URL,
    getData,
    GET_ADDRESS,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getAddressAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_ADDRESS.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/shipping-addresses`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_ADDRESS.SUCCEED, 'Updated to local state.'))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(GET_ADDRESS.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getAddressAction