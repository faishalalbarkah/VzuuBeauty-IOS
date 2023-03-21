import axios from 'axios'
import {
    API_URL,
    DELETE_ADDRESS,
    getData,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const deleteAddressAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(DELETE_ADDRESS.ATTEMPT))

        axios({
            method: 'DELETE',
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
            result.data.statusCode = result.status
            if(result.status !== 200) throw result.data
            dispatch(setSuccess(DELETE_ADDRESS.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(DELETE_ADDRESS.FAILED, error))
            if(res && res.failed) res.failed(error)
        })
    }
}

export default deleteAddressAction