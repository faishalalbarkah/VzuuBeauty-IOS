import React from 'react'
import { StyleSheet } from 'react-native'
import {
    Header,
    MainLayout,
    Text
} from '../../components'

const SelectPayment = ({ navigation }) =>
{
    return (
        <MainLayout>
            <Header
                title="Pilih Pembayaran"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content>
                <Text>Halaman Pilih Pembayaran</Text>
            </MainLayout.Content>
        </MainLayout>
    )
}

const styles = StyleSheet.create({})

export default SelectPayment