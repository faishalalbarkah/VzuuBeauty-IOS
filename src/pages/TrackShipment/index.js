import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Card, Header, Loading, MainLayout, Text } from '../../components'
import { colors } from '../../utils'

const TrackShipment = ({ navigation }) =>
{
    const { data: shipment, isLoading } = useSelector(state => state.trackShipment)

    return (
        <MainLayout>
            <Header
                title="Lacak Pengiriman"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            {isLoading && (<Loading type="inner" />)}
            {shipment && (
                <MainLayout.Content>
                    <Card
                        alignItems="flex-start"
                        padding={15}
                        bottomSpace={15}
                    >
                        {shipment.summary && (
                            <>
                                <View style={styles.cellItem}>
                                    <Text style={styles.label}>Nomor Resi</Text>
                                    <Text style={styles.text}>{shipment.summary.waybill_number}</Text>
                                </View>

                                <View style={styles.grid}>
                                    <View style={styles.gridItem}>
                                        <Text style={styles.label}>Tanggal Pengiriman</Text>
                                        <Text style={styles.text}>
                                            {moment(shipment.summary.waybill_date).format('DD MMMM YYYY')}
                                        </Text>
                                    </View>
                                    <View style={styles.gridItem}>
                                        <Text style={styles.label}>Kode Layanan</Text>
                                        <Text style={styles.text}>
                                            {(shipment.summary.courier_name)
                                            + ' - ' +
                                            (shipment.summary.service_code)}
                                        </Text>
                                    </View>
                                    <View style={styles.gridItem}>
                                        <Text style={styles.label}>Penjual</Text>
                                        <Text style={styles.text}>{shipment.summary.shipper_name}</Text>
                                    </View>
                                    <View style={styles.gridItem}>
                                        <Text style={styles.label}>Pembeli</Text>
                                        <Text style={styles.text}>{shipment.summary.receiver_name}</Text>
                                    </View>
                                </View>
                            </>
                        )}
                    </Card>

                    <Card
                        alignItems="flex-start"
                        padding={15}
                        bottomSpace={15}
                    >
                        {shipment.delivery_status && (
                            <>
                                <Text style={styles.label}>Status</Text>
                                <View style={styles.deliveryStatusWrapper}>
                                    <Text style={styles.deliveryStatus} fontWeight={500}>{shipment.delivery_status.status}</Text>
                                </View>
                            </>
                        )}

                        {shipment.manifest &&
                            shipment.manifest.map((item, index) => (
                                <View
                                    style={styles.shippingItemWrapper}
                                    key={index}
                                >
                                    <View style={styles.bullet(index)} />
                                    <View style={styles.shippingItem}>
                                        <Text style={styles.shippingDate}>
                                            {moment(item.manifest_date).format('DD MMMM YYYY')}{' '} - {item.manifest_time}
                                        </Text>
                                        <Text style={styles.label}>
                                            {item.manifest_description}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                    </Card>
                </MainLayout.Content>
            )}
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    cellItem: { paddingBottom: 8 },
    grid:
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    gridItem:
    {
        width: '50%',
        paddingRight: 5,
        paddingBottom: 8
    },
    label:
    {
        color: '#999999',
        fontSize: 12,
        lineHeight: 17
    },
    text: { fontSize: 12 },
    deliveryStatusWrapper:
    {
        width: '100%',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        marginBottom: 15
    },
    deliveryStatus:
    {
        color: colors.text.secondary,
        fontSize: 14
    },
    shippingItemWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    bullet: index => ({
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: index === 0 ? colors.primary : colors.border,
        position: 'absolute',
        marginLeft: 11,
        zIndex: 5
    }),
    shippingItem:
    {
        borderLeftWidth: 1,
        borderLeftColor: colors.border,
        marginLeft: 5,
        paddingLeft: 20,
        paddingVertical: 8
    },
    shippingDate:
    {
        color: colors.primary,
        fontSize: 12,
        marginBottom: 5
    }
})

export default TrackShipment