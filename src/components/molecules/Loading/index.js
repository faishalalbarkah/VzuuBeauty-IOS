import React from 'react'
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native'
import { colors } from '../../../utils'
import { Text } from '../../atoms'

const Loading = ({ type, bg }) =>
{
    return (
        <View style={styles.container(type, bg)}>
            <ActivityIndicator size={Platform.OS === 'ios' ? 'small' : 'large'} color={colors.primary} />
            <Text style={styles.text(type)}>Memuat...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: (type, bg) => ({
        flex: 1,
        position: typeof type === 'string' && type === 'inner' ? undefined : 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: typeof type === 'string' && type === 'inner' ? bg ? bg : colors.background : colors.loadingBackground,
        width: '100%',
        height: '100%'
    }),
    text: type => ({
        fontSize: typeof type === 'string' && type === 'inner' ? 14 : 16,
        color: colors.primary,
        marginTop: 10
    })
})

export default Loading