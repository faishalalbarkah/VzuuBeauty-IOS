import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, ConfirmationDialog, Header, Loading, MainLayout, OrderItem, PriceLabel, Text } from '../../components'
import { confirmReceiveAction, getOrderDetailAction, getTransactionsAction } from '../../services'
import { BUCKET_URL, colors } from '../../utils'

const OrderDetail = ({ navigation, route }) =>
{
    const dispatch = useDispatch()
    const { data: orderDetail, isLoading } = useSelector(state => state.orderDetail)

    const confirmationRef = useRef()

    const checkOrderStatus = statusId =>
    {
        // Unpaid
        if(statusId === 5) return 'Menunggu Pembayaran'

        // Processing
        if(statusId === 6) return 'Diproses'

        // On Delivery
        if(statusId === 7) return 'Sedang Dikirim'

        // Canceled
        if(statusId === 9) return 'Dibatalkan'

        // Done
        if(statusId === 8) return 'Selesai'

        return undefined
    }

    const confirmReceiveHandler = orderId =>
    {
        dispatch(confirmReceiveAction({ order_id: orderId }))
        dispatch(getTransactionsAction({ type: 'trx-status', status_id: 7 }))
        confirmationRef.current.close()
        navigation.goBack()
    }

    const goToCreateReviewHandler = productItem =>
    {
        navigation.navigate('CreateReview', productItem)
    }

    useEffect(() =>
    {
        if(route.params) dispatch(getOrderDetailAction(route.params))
    }, [])

    return (
        <MainLayout>
            <Header
                title="Detail Pesanan"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            {isLoading && (<Loading type="inner" />)}
            {orderDetail && (
                <>
                    <MainLayout.Content>
                        <Card
                            title={checkOrderStatus(orderDetail.status_id)}
                            alignItems="flex-start"
                            padding={15}
                            bottomSpace={15}
                        >
                            <Card.Row justifyContent="space-between" topSpace={10} bottomSpace={8}>
                                <Text style={styles.label}>Nomor Invoice</Text>
                                <Text style={styles.text}>{orderDetail.invoice_number}</Text>
                            </Card.Row>

                            <Card.Row justifyContent="space-between" bottomSpace={5}>
                                <Text style={styles.label}>Tanggal Pembelian</Text>
                                <Text style={styles.text}>
                                    {moment(orderDetail.created_at).format('DD MMMM YYYY')}
                                </Text>
                            </Card.Row>
                        </Card>

                        {/* Detail Produk */}
                        <Card
                            title="Detail Produk"
                            titleVariant="uppercase"
                            alignItems="flex-start"
                            padding={15}
                            bottomSpace={15}
                        >
                            {orderDetail.note === 'TOPUP' ? (
                                <Card.Row bottomSpace={5}>
                                    <Text style={styles.narrowLabel}>{orderDetail.note}</Text>
                                    <PriceLabel value={orderDetail.grand_total} textType="medium" />
                                </Card.Row>
                            ) : (
                                orderDetail.order_items.map((item, index) => (
                                    <OrderItem
                                        image={item.image && { uri: `${BUCKET_URL}/${item.image}` }}
                                        name={item.product_name}
                                        price={item.price}
                                        quantity={item.qty}
                                        isReviewButtonShowed={(orderDetail.status_id === 8 && item.is_review === 0) ? true : false}
                                        goToCreateReview={() => goToCreateReviewHandler(item)}
                                        bottomSpace={(index+1) !== orderDetail.order_items.length ? 10 : 5}
                                        key={index}
                                    />
                                ))
                            )}
                        </Card>

                        {/* Info Pengiriman */}
                        {orderDetail.note !== 'TOPUP' && (
                            <Card
                                title="Info Pengiriman"
                                titleVariant="uppercase"
                                alignItems="flex-start"
                                padding={15}
                                bottomSpace={15}
                            >
                                <Card.Row bottomSpace={8}>
                                    <Text width={85} style={styles.label}>Kurir</Text>
                                    <Text autoWidth style={styles.text}>
                                        {orderDetail.order_shipping && orderDetail.order_shipping.delivery_courier } - {orderDetail.order_shipping && orderDetail.order_shipping.delivery_service }
                                    </Text>
                                </Card.Row>

                                {(orderDetail.status_id === 7 || orderDetail.status_id === 8) && (
                                    <Card.Row bottomSpace={8}>
                                        <Text width={85} style={styles.label}>Nomor Resi</Text>
                                        <Text autoWidth style={styles.text}>
                                            {orderDetail.order_shipping && orderDetail.order_shipping.awb }
                                        </Text>
                                    </Card.Row>
                                )}

                                <Card.Row alignItems="none" bottomSpace={5}>
                                    <Text width={85} style={styles.label}>Alamat</Text>
                                    <Text autoWidth style={[styles.text, styles.textAddress]}>
                                        <Text fontWeight={500}>{orderDetail.order_shipping && orderDetail.order_shipping.name}</Text>
                                        {'\n'}
                                        {orderDetail.order_shipping && orderDetail.order_shipping.phone_number}
                                        {'\n'}
                                        {orderDetail.order_shipping && orderDetail.order_shipping.address}
                                    </Text>
                                </Card.Row>
                            </Card>
                        )}

                        {/* Rincian Pembayaran */}
                        <Card
                            title="Rincian Pembayaran"
                            titleVariant="uppercase"
                            alignItems="flex-start"
                            padding={15}
                            bottomSpace={15}
                        >
                            <Card.Row justifyContent="space-between" bottomSpace={8}>
                                <Text style={styles.label}>Metode Pembayaran</Text>
                                <Text style={styles.text}>
                                    {orderDetail.payment_method
                                    ? orderDetail.payment_method === 'BALANCE' ? 'Saldo Vzuu' : orderDetail.payment_method
                                    : '-'}
                                </Text>
                            </Card.Row>

                            {orderDetail.note === 'TOPUP' && (
                                <Card.Row justifyContent="space-between" bottomSpace={8}>
                                    <Text style={styles.label}>Bank</Text>
                                    <Text style={styles.text}>
                                        {orderDetail.payment_channel ? orderDetail.payment_channel : '-'}
                                    </Text>
                                </Card.Row>
                            )}

                            <Card.Row justifyContent="space-between" bottomSpace={8}>
                                <Text style={styles.label}>Total Harga ({orderDetail.total_qty} barang)</Text>
                                <PriceLabel value={orderDetail.total_price} textSize={12} textType="regular" />
                            </Card.Row>

                            <Card.Row justifyContent="space-between" bottomSpace={8}>
                                <Text style={styles.label}>Total Ongkos Kirim</Text>
                                <PriceLabel value={orderDetail.shipping_fee} textSize={12} textType="regular" />
                            </Card.Row>

                            <View style={styles.grandTotalWrapper}>
                                <Card.Row justifyContent="space-between" bottomSpace={5}>
                                    <Text fontWeight={500} style={styles.label}>Total Belanja</Text>
                                    <PriceLabel value={orderDetail.grand_total ? orderDetail.grand_total : (orderDetail.total_price + orderDetail.shipping_fee)} textSize={12} />
                                </Card.Row>
                            </View>
                        </Card>

                        {orderDetail.status_id === 7 && (
                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Selesaikan Pesanan"
                                    onPress={() => confirmationRef.current.open()}
                                />
                            </View>
                        )}
                    </MainLayout.Content>

                    <ConfirmationDialog
                        ref={confirmationRef}
                        message={`Apa kamu yakin menyelesaikan pesanan ini? \nPastikan pesanannya sudah diterima.`}
                        onSubmit={() => confirmReceiveHandler(orderDetail.id)}
                    />
                </>
            )}
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    label:
    {
        color: '#999999',
        fontSize: 12
    },
    narrowLabel:
    {
        color: '#999999',
        fontSize: 12,
        minWidth: 85,
        marginRight: 5
    },
    text: { fontSize: 12 },
    textAddress: { lineHeight: 19 },
    grandTotalWrapper:
    {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 8
    },
    buttonWrapper: { marginBottom: 15 }
})

export default OrderDetail