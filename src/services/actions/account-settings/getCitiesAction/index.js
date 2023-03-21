import axios from 'axios'
import {
    API_URL,
    getData,
    GET_CITIES,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getCitiesAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_CITIES.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/cities?province_id=${req.id}`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_CITIES.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(GET_CITIES.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getCitiesAction