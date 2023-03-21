import axios from 'axios'
import {
    API_URL,
    getData,
    REMOVE_FROM_CART,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const removeFromCartAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(REMOVE_FROM_CART.ATTEMPT))

        axios({
            method: 'DELETE',
            url: `${API_URL}/cart/delete`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(REMOVE_FROM_CART.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(REMOVE_FROM_CART.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default removeFromCartAction