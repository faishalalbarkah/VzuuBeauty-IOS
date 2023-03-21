import axios from 'axios'
import {
    API_URL,
    CHANGE_PASSWORD,
    getData,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const changePasswordAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(CHANGE_PASSWORD.ATTEMPT))

        axios({
            method: 'PUT',
            url: `${API_URL}/change-password`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(CHANGE_PASSWORD.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(CHANGE_PASSWORD.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default changePasswordAction