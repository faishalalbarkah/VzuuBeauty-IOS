import React from 'react'
import { StyleSheet } from 'react-native'
import { Header, MainLayout, Text } from '../../components'

const Review = ({ navigation }) =>
{
    return (
        <MainLayout>
            <Header
                title="Ulasan"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content bg="transparent">
                <Text>Halaman Ulasan</Text>
            </MainLayout.Content>
        </MainLayout>
    )
}

const styles = StyleSheet.create({})

export default Review