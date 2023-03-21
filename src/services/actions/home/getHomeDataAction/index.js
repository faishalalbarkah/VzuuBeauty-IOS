import axios from 'axios'
import {
    API_URL,
    getData,
    GET_HOME_DATA,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getHomeDataAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_HOME_DATA.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/home`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_HOME_DATA.SUCCEED, result.data.datas))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(GET_HOME_DATA.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getHomeDataAction