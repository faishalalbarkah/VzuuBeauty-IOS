import axios from 'axios'
import {
    API_URL,
    getData,
    LOGOUT,
    removeData,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const logoutAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(LOGOUT.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/auth/signout`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(async () =>
        {
            dispatch(setSuccess(LOGOUT.SUCCEED, 'success'))
            await removeData('access_token')
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(LOGOUT.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default logoutAction