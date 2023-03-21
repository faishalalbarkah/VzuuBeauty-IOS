import axios from 'axios'
import {
    API_URL,
    LOGIN,
    setFail,
    setLoading,
    setSuccess,
    storeData
} from '../../../../utils'

const loginAction = (req, res) =>
{
    return dispatch =>
    {
        dispatch(setLoading(LOGIN.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/auth/${req.type === 'google-signin' ? 'google' : 'signin'}`,
            data: req
        })
        .then(async result =>
        {
            dispatch(setSuccess(LOGIN.SUCCEED, 'success'))
            await storeData('access_token', result.data.token)
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(LOGIN.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default loginAction