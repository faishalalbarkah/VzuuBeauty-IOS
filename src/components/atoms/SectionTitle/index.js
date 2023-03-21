import React from 'react'
import { StyleSheet } from 'react-native'
import { colors, fonts } from '../../../utils'
import Text from '../Text'

const SectionTitle = ({ text, horizontalSpace, bottomSpace }) =>
{
    return <Text style={styles.text(horizontalSpace, bottomSpace)}>{text}</Text>
}

const styles = StyleSheet.create({
    text: (horizontalSpace, bottomSpace) => ({
        color: colors.text.secondary,
        fontFamily: fonts.primary[500],
        fontSize: 16,
        marginHorizontal: typeof horizontalSpace === 'number' ? horizontalSpace : 0,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    })
})

export default SectionTitle