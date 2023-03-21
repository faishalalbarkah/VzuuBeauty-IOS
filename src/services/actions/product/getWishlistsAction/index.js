import axios from 'axios'
import {
    API_URL,
    getData,
    GET_WISHLISTS,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getWishlistsAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_WISHLISTS.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/wishlist`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_WISHLISTS.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(GET_WISHLISTS.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getWishlistsAction