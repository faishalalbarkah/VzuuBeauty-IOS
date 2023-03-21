import axios from 'axios'
import {
    API_URL,
    getData,
    GET_TRANSACTIONS,
    setFail,
    setLoading,
    setSuccess
} from '../../../../utils'

const getTransactionsAction = (req, res) =>
{
    let currPath = 'transactions'

    if(req && req.type === 'trx-status') currPath = `${currPath}?status_id=${req.status_id}`

    return async dispatch =>
    {
        const accessToken = await getData('access_token')

        dispatch(setLoading(GET_TRANSACTIONS.ATTEMPT))

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
            dispatch(setSuccess(GET_TRANSACTIONS.SUCCEED, 'Updated to local state.'))
            if(res && res.succeed) res.succeed(result.data)
        })
        .catch(error =>
        {
            const errors = (error.response && error.response.data && error.response.data.errors) ? error.response.data.errors : error
            dispatch(setFail(GET_TRANSACTIONS.FAILED, errors))
            if(res && res.failed) res.failed()
        })
    }
}

export default getTransactionsAction