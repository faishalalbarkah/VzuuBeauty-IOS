import axios from 'axios'
import {
    API_URL,
    CREATE_ADDRESS,
    getData,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const createAddressAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(CREATE_ADDRESS.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/shipping-addresses`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(CREATE_ADDRESS.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(CREATE_ADDRESS.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default createAddressAction