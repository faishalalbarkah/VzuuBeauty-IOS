import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { ILGoogleLogo } from '../../../assets'
import { colors } from '../../../utils'

const GoogleButton = ({ bottomSpace, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container(bottomSpace)}
            onPress={onPress}
        >
            <Image source={ILGoogleLogo} style={styles.image} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: colors.white,
        borderRadius: 8,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    image:
    {
        width: 30,
        height: 30
    }
})

export default GoogleButton