import axios from 'axios'
import {
    API_URL,
    getData,
    GET_CART_DATA,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getCartDataAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_CART_DATA.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/cart`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_CART_DATA.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(GET_CART_DATA.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getCartDataAction