import axios from 'axios'
import {
    API_URL,
    getData,
    GET_PRODUCT_DETAIL,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getProductDetailAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_PRODUCT_DETAIL.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/product/detail?id=${req.id}`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_PRODUCT_DETAIL.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(GET_PRODUCT_DETAIL.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getProductDetailAction