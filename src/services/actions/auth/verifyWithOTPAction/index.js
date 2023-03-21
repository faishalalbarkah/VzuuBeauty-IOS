import axios from 'axios'
import {
    API_URL,
    setFail,
    setLoading,
    setSuccess,
    VERIFY_WITH_OTP
} from '../../../../utils'

const verifyWithOTPAction = (req, res) =>
{
    let currPath = ''

    if(req.type === 'reset-password') currPath = 'verify-otp'
    if(req.type === 'account-activation') currPath = 'account-activation'

    return dispatch =>
    {
        dispatch(setLoading(VERIFY_WITH_OTP.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/auth/${currPath}`,
            data:
            {
                email: req.email,
                otp: req.otp
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(VERIFY_WITH_OTP.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(VERIFY_WITH_OTP.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default verifyWithOTPAction