import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, EmptyData, Header, Loading, MainLayout, SelectableItem, TransactionHistoryItem } from '../../components'
import { getTransactionsAction, trackShipmentAction } from '../../services'
import { BUCKET_URL, colors, wait } from '../../utils'

const Transactions = ({ navigation }) =>
{
    const [transactions, setTransactions] = useState(null)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [isTabLoading, setIsTabLoading] = useState(null)
    const [activeTab, setAciveTab] = useState(null)
    const [isReset, setIsReset] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.transactions)

    const options = [
        {
            value: 5,
            label: 'Belum Dibayar'
        },
        {
            value: 6,
            label: 'Diproses'
        },
        {
            value: 7,
            label: 'Dikirim'
        },
        {
            value: 9,
            label: 'Dibatalkan'
        },
        {
            value: 8,
            label: 'Selesai'
        },
    ]

    const refreshHandler = useCallback(() =>
    {
        let req = null

        if(activeTab !== null)
        {
            req = {
                type: 'trx-status',
                status_id: activeTab
            }
        }

        const res = {
            succeed: result =>
            {
                setTransactions(result)
                setRefreshing(false)
            }
        }

        setRefreshing(true)
        wait(1500).then(() => dispatch(getTransactionsAction(req, res)))
    }, [activeTab])

    const getTransactionsHandler = () =>
    {
        const res = {
            succeed: result =>
            {
                setTransactions(result)
                if(isFirstLoad) setIsFirstLoad(false)
            }
        }

        dispatch(getTransactionsAction(null, res))
    }

    const getTransactionsByStatusIdHandler = statusId =>
    {
        setIsTabLoading(true)
        setAciveTab(statusId)

        const req = {
            type: 'trx-status',
            status_id: statusId
        }

        const res = {
            succeed: result =>
            {
                setTransactions(result)
                setIsTabLoading(false)
            }
        }

        dispatch(getTransactionsAction(req, res))
    }

    const resetFilterHandler = () =>
    {
        setIsReset(true)
        setAciveTab(null)
        setIsTabLoading(true)

        const res = {
            succeed: result =>
            {
                setTransactions(result)
                setIsTabLoading(false)
            }
        }

        dispatch(getTransactionsAction(null, res))
    }

    const trackShipmentHandler = (courier, waybill) =>
    {
        const form = { courier, waybill }

        dispatch(trackShipmentAction(form))
        navigation.navigate('TrackShipment')
    }

    const checkOrderStatus = statusId =>
    {
        // Unpaid
        if(statusId === 5) return {
            statusText: 'warning',
            label: 'Menunggu Pembayaran'
        }

        // Processing
        if(statusId === 6) return {
            statusText: 'warning',
            label: 'Diproses'
        }

        // On Delivery
        if(statusId === 7) return {
            statusText: 'warning',
            label: 'Sedang Dikirim'
        }

        // Canceled
        if(statusId === 9) return {
            statusText: 'danger',
            label: 'Dibatalkan'
        }
    
        // Done
        if(statusId === 8) return {
            statusText: 'success',
            label: 'Selesai'
        }

        return undefined
    }
    
    const isButtonShown = value =>
    {
        // Unpaid
        if(value.status.id === 5) return {
            text: 'Bayar',
            buttonVariant: 'small',
            onPress: () => navigation.navigate('Payment', { url: value.invoice_url })
        }

        // On Delivery
        if(value.status.id === 7) return {
            text: 'Lacak',
            buttonVariant: 'small-outlined',
            onPress: () => trackShipmentHandler(value.order_shipping.delivery_courier, value.order_shipping.awb)
        }

        // Done
        if(value.status.id === 8) return {
            text: 'Beli Lagi',
            buttonVariant: 'small',
            onPress: () => navigation.navigate('ProductDetail', { id: value.order_item.product_id })
        }

        return undefined
    }

    useEffect(() =>
    {
        getTransactionsHandler()
    }, [])

    return (
        <MainLayout>
            <Header
                title="Transaksi"
                logo
                cartButton
            />
            {(isLoading && isFirstLoad) ? (
                <Loading type="inner" />
            ) : (
                transactions && (
                    <>
                        {(transactions.length > 0 || (transactions.length === 0 && isReset) || (transactions.length === 0 && activeTab !== null)) && (
                            <View style={styles.tabWrapper}>
                                <SelectableItem
                                    data={options}
                                    currentActive={activeTab}
                                    onReset={resetFilterHandler}
                                    topSpace={15}
                                    itemOuterGap={15}
                                    renderItem={(item, index) => (
                                        <SelectableItem.Item
                                            value={item.value}
                                            label={item.label}
                                            variant="big"
                                            activeStatus={item.active_status}
                                            onPress={val => getTransactionsByStatusIdHandler(val)}
                                            key={index}
                                        />
                                    )}
                                />
                            </View>
                        )}
                        
                        <MainLayout.Content
                            scrollable={transactions.length > 0 ? (isLoading && isTabLoading) ? false : true : false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={refreshHandler}
                                />
                            }
                        >
                            {(isLoading && isTabLoading) ? (
                                <Loading type="inner" />
                            ) : (
                                transactions.length > 0 ? (
                                    transactions.map((item, index) => (
                                        <TransactionHistoryItem
                                            date={moment(item.created_at).format('DD MMMM YYYY')}
                                            status={checkOrderStatus(item.status.id)}
                                            image={item.order_item.image && { uri: `${BUCKET_URL}/${item.order_item.image}` }}
                                            name={item.order_item.product_name}
                                            quantity={item.total_qty}
                                            price={item.total_price ? item.total_price : item.grand_total}
                                            bottomSpace={(index+1) !== transactions.length ? 15 : 30}
                                            onPress={() => navigation.navigate('OrderDetail', { id: item.id })}
                                            actionButton={isButtonShown(item)}
                                            key={index}
                                        />
                                    ))
                                ) : (
                                    <View style={styles.emptyData}>
                                        {activeTab !== null && (
                                            <EmptyData
                                                type="cart"
                                                message={'Tidak ada transaksi dengan filter ini.'}
                                                topSpace={-150}
                                                bottomSpace={25}
                                            />
                                        )}
                                        
                                        {(activeTab === null && !isReset) && (
                                            <>
                                                <EmptyData
                                                    type="cart"
                                                    message={'Belum ada transaksi.'}
                                                    topSpace={-150}
                                                    bottomSpace={25}
                                                />
                                                <View style={styles.callToAction}>
                                                    <Button
                                                        title="Belanja Sekarang"
                                                        onPress={() => navigation.navigate('Home')}
                                                    />
                                                </View>
                                            </>
                                        )}
                                    </View>
                                )
                            )}
                        </MainLayout.Content>
                    </>
                )
            )}
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    tabWrapper: { backgroundColor: colors.background },
    emptyData:
    {
        flex: 1,
        justifyContent: 'center'
    },
    callToAction:
    {
        width: 200,
        alignSelf: 'center'
    }
})

export default Transactions