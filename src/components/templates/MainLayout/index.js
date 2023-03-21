import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { colors } from '../../../utils'
import Content from './Content'
import Grid from './Grid'

const MainLayout = ({ children }) =>
{
    return (
        <View style={styles.page}>
            <SafeAreaView style={styles.safeAreaView}>
                {children}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    page:
    {
        flex: 1,
        backgroundColor: colors.white
    },
    safeAreaView: { flex: 1 }
})

MainLayout.Content = Content
MainLayout.Grid = Grid

export default MainLayout