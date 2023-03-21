import React from 'react'
import { StyleSheet } from 'react-native'
import { Header, MainLayout, Text } from '../../components'

const CreateReview = ({ navigation }) =>
{
    return (
        <MainLayout>
            <Header
                title="Beri Ulasan"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content bg="transparent">
                <Text>Halaman Beri Ulasan</Text>
            </MainLayout.Content>
        </MainLayout>
    )
}

const styles = StyleSheet.create({})

export default CreateReview