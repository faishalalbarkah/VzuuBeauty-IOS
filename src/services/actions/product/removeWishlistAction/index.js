import axios from 'axios'
import {
    API_URL,
    getData,
    REMOVE_WISHLIST,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const removeWishlistAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(REMOVE_WISHLIST.ATTEMPT))

        axios({
            method: 'DELETE',
            url: `${API_URL}/wishlist/delete`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(REMOVE_WISHLIST.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(REMOVE_WISHLIST.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default removeWishlistAction