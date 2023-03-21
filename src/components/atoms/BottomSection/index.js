import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../../utils'

const BottomSection = ({ children }) =>
{
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 15,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10
    }
})

export default BottomSection