import axios from 'axios'
import {
    ADD_OR_SUBTRACT_CART,
    API_URL,
    getData,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const addOrSubtractCartAction = (req, res) =>
{
    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(ADD_OR_SUBTRACT_CART.ATTEMPT))

        axios({
            method: 'POST',
            url: `${API_URL}/cart/add`,
            headers:
            {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            data: req
        })
        .then(result =>
        {
            dispatch(setSuccess(ADD_OR_SUBTRACT_CART.SUCCEED, result.data))
            if(res && res.succeed) res.succeed()
        })
        .catch(error =>
        {
            dispatch(setFail(ADD_OR_SUBTRACT_CART.FAILED, error))
            if(res && res.failed) res.failed()
        })
    }
}

export default addOrSubtractCartAction