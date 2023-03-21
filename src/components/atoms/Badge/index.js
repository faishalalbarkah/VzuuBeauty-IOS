import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import Text from '../Text'

const Badge = ({ text, type, variant, leftSpace }) =>
{
    let color = '#757575'
    let bg = colors.disable

    if(type === 'success')
    {
        color = '#4CAF50'
        bg = '#DCEDC8'
    }

    if(type === 'danger')
    {
        color = '#E57373'
        bg = '#FFCDD2'
    }

    if(type === 'warning')
    {
        color = '#FFA000'
        bg = '#FFF9C4'
    }

    return (
        <View style={styles.badge(bg, variant, leftSpace)}>
            <Text style={styles.text(color, variant)}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: (bg, variant, leftSpace) => ({
        backgroundColor: bg,
        paddingVertical: variant === 'small' ? 3 : 5,
        paddingHorizontal: variant === 'small' ? 8 : 10,
        borderRadius: variant === 'small' ? 3 : 5,
        marginLeft: typeof leftSpace === 'number' ? leftSpace : 0
    }),
    text: (color, variant) => ({
        color,
        fontFamily: fonts.primary[500],
        fontSize: variant === 'small' ? 11 : 12
    })
})

export default Badge