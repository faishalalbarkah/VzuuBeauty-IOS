import React from 'react'
import { StyleSheet, Text as NativeText } from 'react-native'
import { fonts } from '../../../utils'

const Text = ({ children, color, width, autoWidth, fontWeight, style, bottomSpace, ...rest }) =>
{
    return (
        <NativeText
            style={style ? [styles.text(color, width, autoWidth, fontWeight, bottomSpace), style] : styles.text(color, width, autoWidth, fontWeight, bottomSpace)}
            {...rest}
        >
            {children}
        </NativeText>
    )
}

const styles = StyleSheet.create({
    text: (color, width, autoWidth, fontWeight, bottomSpace) => ({
        color: typeof color === 'string' ? color : '#757575',
        width,
        flex: autoWidth ? 1 : undefined,
        fontFamily: fonts.primary[typeof fontWeight === 'number' ? fontWeight : 400],
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    })
})

export default Text