import axios from 'axios'
import {
    API_URL,
    getData,
    GET_PROVINCES,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getProvincesAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_PROVINCES.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/provinces`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_PROVINCES.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(GET_PROVINCES.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getProvincesAction