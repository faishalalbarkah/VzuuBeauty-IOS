import axios from 'axios'
import {
    API_URL,
    REQUEST_OTP,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const requestOTPAction = (req, res) =>
{
    let currPath = ''

    if(req.type === 'reset-password') currPath = 'forgot-password'
    if(req.type === 'account-activation') currPath = 'account-activation/resend-otp'

    return dispatch =>
    {
        dispatch(setLoading(REQUEST_OTP.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/auth/${currPath}`,
            data: req.email
        })
        .then(result =>
        {
            dispatch(setSuccess(REQUEST_OTP.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(REQUEST_OTP.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default requestOTPAction