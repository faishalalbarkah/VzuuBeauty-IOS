import React from 'react'
import { StyleSheet } from 'react-native'
import Text from '../Text'

const Link = ({ title, textSize, textDecoration, color, fontWeight, bottomSpace, onPress }) =>
{
    return (
        <Text
            style={styles.link(textSize, textDecoration, color, bottomSpace)}
            fontWeight={fontWeight}
            onPress={onPress}
        >
            {title}
        </Text>
    )
}

const styles = StyleSheet.create({
    link: (textSize, textDecoration, color, bottomSpace) => ({
        color: typeof color === 'string' ? color : '#999999',
        fontSize: typeof textSize === 'number' ? textSize : 14,
        textDecorationLine: typeof textDecoration === 'string' ? textDecoration : 'underline',
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    })
    
})

export default Link