import axios from 'axios'
import {
    ADD_WISHLIST,
    API_URL,
    getData,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const addWishlistAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(ADD_WISHLIST.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/wishlist/add`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(ADD_WISHLIST.SUCCEED, result.data))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            dispatch(setFail(ADD_WISHLIST.FAILED, error))
            if(res && res.failed) res.failed()
        })
    }
}

export default addWishlistAction