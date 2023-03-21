import axios from 'axios'
import {
    API_URL,
    RESET_PASSWORD,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const resetPasswordAction = (req, res) =>
{
    return dispatch =>
    {
        dispatch(setLoading(RESET_PASSWORD.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/auth/reset-password`,
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(RESET_PASSWORD.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(RESET_PASSWORD.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default resetPasswordAction