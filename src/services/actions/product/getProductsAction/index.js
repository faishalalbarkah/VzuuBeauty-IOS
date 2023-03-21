import axios from 'axios'
import {
    API_URL,
    getData,
    GET_PRODUCTS,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getProductsAction = (req, res) =>
{
    let currPath = 'products'

    if(req && req.type === 'sort-by-price') currPath = `${currPath}?sortBy=price&order=${req.order}`
    if(req && req.type === 'sort-by-bestseller') currPath = `${currPath}?sortBy=${req.order}`
    if(req && req.type === 'min-max') currPath = `${currPath}?min=${req.min}&max=${req.max}`
    if(req && req.type === 'all-1') currPath = `${currPath}?sortBy=price&order=${req.order}&min=${req.min}&max=${req.max}`
    if(req && req.type === 'all-2') currPath = `${currPath}?sortBy=${req.order}&min=${req.min}&max=${req.max}`
    if(req && req.type === 'category') currPath = `${currPath}?category_id=${req.category_id}`

    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_PRODUCTS.ATTEMPT))

        axios({
            method: 'GET',
            url: `${API_URL}/${currPath}`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(result =>
        {
            dispatch(setSuccess(GET_PRODUCTS.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(GET_PRODUCTS.FAILED, error.response.data.errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getProductsAction