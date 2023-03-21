import axios from 'axios'
import {
    API_URL,
    getData,
    setFail,
    setLoading,
    setSuccess,
    UPDATE_PROFILE
} from '../../../../utils'

const updateProfileAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(UPDATE_PROFILE.ATTEMPT))

        axios({
            method: 'PUT',
            url: `${API_URL}/profile`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(UPDATE_PROFILE.SUCCEED, result))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(UPDATE_PROFILE.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default updateProfileAction