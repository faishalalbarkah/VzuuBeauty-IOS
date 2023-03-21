import axios from 'axios'
import {
    API_URL,
    getData,
    GET_SUBDISTRICTS,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getSubdistrictsAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_SUBDISTRICTS.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/subdistricts?city_id=${req.id}`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_SUBDISTRICTS.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(GET_SUBDISTRICTS.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getSubdistrictsAction