import React from 'react'
import { StyleSheet } from 'react-native'
import { Header, MainLayout, Text } from '../../components'

const Search = ({ navigation }) =>
{
    return (
        <MainLayout>
            <Header
                title="Telusuri"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content bg="transparent">
                <Text>Halaman Penelusuran</Text>
            </MainLayout.Content>
        </MainLayout>
    )
}

const styles = StyleSheet.create({})

export default Search