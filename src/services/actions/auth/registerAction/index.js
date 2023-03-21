import axios from 'axios'
import {
    API_URL,
    REGISTER,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const registerAction = (req, res) =>
{
    return dispatch =>
    {
        dispatch(setLoading(REGISTER.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/auth/signup`,
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(REGISTER.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(REGISTER.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default registerAction