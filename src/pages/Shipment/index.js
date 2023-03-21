import React, { useState } from 'react'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Card, Header, MainLayout,
    PriceLabel,
    PurchaseItem,
    SelectCourier,
    Text
} from '../../components'
import { getDefaultAddressAction } from '../../services'
import { BUCKET_URL, colors, fonts } from '../../utils'

const Shipment = ({ navigation }) =>
{
    const [address, setAddress] = useState(null)
    const [courier, setCourier] = useState({
        code: '',
        serviceProvider: '',
        image: ''
    })

    const [serviceType, setServiceType] = useState({
        code: '',
        cost: 0,
        estimation: ''
    })

    const dispatch = useDispatch()
    const { cart, isLoading } = useSelector(state => state)
    console.log('Get data Cart:', cart)

    const getDefaultAddressHandler = () =>
    {
        const res = {
            succeed: result => setAddress({
                type: result[0].type,
                name: result[0].name,
                phone: result[0].phone_number,
                address: result[0].address
            })
        }

        dispatch(getDefaultAddressAction(null, res))
    }

    const selectPaymentHandler = () =>
    {
        navigation.navigate('SelectPayment')
    }

    useEffect(() =>
    {
        getDefaultAddressHandler()
    }, [])

    return (
        <MainLayout>
            <Header
                title="Pengiriman"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content>
                {/* Alamat Pengiriman */}
                {address && (
                    <Card
                        title="Alamat Pengiriman"
                        headerLink={{
                            title: 'Pilih Alamat Lain',
                            onPress: () => navigation.navigate('Address', { fromPage: 'Shipment' })
                        }}
                        alignItems="flex-start"
                        padding={15}
                        bottomSpace={15}
                    >
                        <Text style={[styles.textAddress, styles.textAddressTitle]}>{address.type}</Text>
                        <Text style={styles.textAddress}>
                            {address.name} ({address.phone})
                            {'\n'}
                            {address.address}
                        </Text>
                    </Card>
                )}

                {/* Daftar Pembelian */}
                <Card
                    title="Daftar Pembelian"
                    titleVariant="uppercase"
                    alignItems="flex-start"
                    padding={15}
                    bottomSpace={15}
                >
                    <PurchaseItem
                        name="Nama Produk yang Agak Panjang ABC"
                        quantity={15}
                        weight={500}
                        price={555000}
                        bottomSpace={10}
                    />
                </Card>

                {/* Pilih Pengiriman */}
                <SelectCourier
                    courier={{
                        serviceProvider: courier.serviceProvider !== '' ? courier.serviceProvider : null,
                        image: courier.image !== '' ? { uri: `${BUCKET_URL}/${courier.image}` } : null
                    }}
                    onPress={() => alert('Test component')}
                    serviceType={{
                        code: serviceType.code !== '' ? serviceType.code : null,
                        cost: serviceType.cost !== 0 ? serviceType.cost : null,
                        estimation: serviceType.estimation !== '' ? serviceType.estimation : null,
                        onPress: () => alert('Ok')
                    }}
                    bottomSpace={15}
                />

                {/* Ringkasan Belanja */}
                <Card
                    title="Ringkasan Belanja"
                    titleVariant="uppercase"
                    alignItems="flex-start"
                    padding={15}
                    bottomSpace={15}
                >
                    <Card.Row justifyContent="space-between" bottomSpace={8}>
                        <Text style={styles.label}>Total Harga (5 barang)</Text>
                        <PriceLabel value={155000} textSize={12} textType="regular" />
                    </Card.Row>

                    <Card.Row justifyContent="space-between" bottomSpace={8}>
                        <Text style={styles.label}>Total Ongkos Kirim</Text>
                        <PriceLabel value={8000} textSize={12} textType="regular" />
                    </Card.Row>

                    <View style={styles.grandTotalWrapper}>
                        <Card.Row justifyContent="space-between" bottomSpace={5}>
                            <View>
                                <Text fontWeight={500} style={styles.label} bottomSpace={3}>Total Tagihan</Text>
                                <PriceLabel value={155000} textSize={12} color={colors.primary} />
                            </View>
                            <Button
                                title="Pilih Pembayaran"
                                onPress={selectPaymentHandler}
                            />
                        </Card.Row>
                    </View>
                </Card>
            </MainLayout.Content>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    label:
    {
        color: '#999999',
        fontSize: 12
    },
    textAddress:
    {
        fontSize: 12,
        lineHeight: 17,
    },
    textAddressTitle:
    {
        fontFamily: fonts.primary[500],
        marginTop: 10,
        marginBottom: 5
    },
    grandTotalWrapper:
    {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 15
    }
})

export default Shipment