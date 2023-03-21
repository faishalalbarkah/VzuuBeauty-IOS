import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../../utils'
import Text from '../Text'
import GoogleButton from './GoogleButton'

const Button = ({ children, title, variant, disabled, size, leftSpace, rightSpace, bottomSpace, onPress }) =>
{
    if(variant === 'google-button') return <GoogleButton onPress={onPress} bottomSpace={bottomSpace} />

    return (
        <TouchableOpacity
            style={styles.button(variant, disabled, size, leftSpace, rightSpace, bottomSpace)}
            disabled={disabled}
            onPress={onPress}
        >
            {children ? (
                children
            ) : (
                <Text style={styles.text(variant, disabled)} fontWeight={500}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: (variant, disabled, size, leftSpace, rightSpace, bottomSpace) => ({
        width: typeof size === 'number' ? size : undefined,
        height: typeof size === 'number' ? size : undefined,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: (variant === 'outlined' || variant === 'small-outlined')
                            ? disabled
                                ? '#f8f8f8' : 'transparent'
                            : disabled
                                ? colors.button.disable.background : colors.primary,
        borderWidth: 1,
        borderColor: disabled ? colors.button.disable.background : colors.primary,
        paddingVertical: typeof size === 'number' ? 0 : (variant === 'small' || variant === 'small-outlined') ? 5 : 12,
        paddingHorizontal: typeof size === 'number' ? 0 : (variant === 'small' || variant === 'small-outlined') ? 15 : 12,
        borderRadius: (variant === 'small' || variant === 'small-outlined') ? 5 : 10,
        marginLeft: typeof leftSpace === 'number' ? leftSpace : 0,
        marginRight: typeof rightSpace === 'number' ? rightSpace : 0,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0,
    }),
    text: (variant, disabled) => ({
        color: disabled
                ? colors.button.disable.text
                : (variant === 'outlined' || variant === 'small-outlined')
                    ? colors.primary : '#786260',
        fontSize: (variant === 'small' || variant === 'small-outlined') ? 12 : 14,
        textAlign: 'center'
    })
})

export default Button