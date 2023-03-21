import axios from 'axios'
import {
    API_URL,
    getData,
    GET_TOTAL_CART_DATA,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getTotalCartDataAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_TOTAL_CART_DATA.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/cart/count`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_TOTAL_CART_DATA.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(GET_TOTAL_CART_DATA.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getTotalCartDataAction