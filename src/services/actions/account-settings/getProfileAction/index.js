import axios from 'axios'
import {
    API_URL,
    getData,
    GET_PROFILE,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getProfileAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_PROFILE.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/profile`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_PROFILE.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(GET_PROFILE.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getProfileAction