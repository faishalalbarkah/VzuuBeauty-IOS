import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ILLogoWide } from '../../../assets'

const Logo = () =>
{
    return <Image source={ILLogoWide} style={styles.logo} />
}

const styles = StyleSheet.create({
    logo:
    {
        width: 50,
        aspectRatio: 2/1,
        height: undefined
    }
})

export default Logo