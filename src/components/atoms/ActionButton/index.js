import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../../utils'
import Icon from '../Icon'
import Text from '../Text'

const ActionButton = ({ name, variant, disabled, size, color, alignSelf, onPress }) =>
{
    const InnerButton = () =>
    {
        if(name === 'decrement') return <Text style={styles.actionSymbol} fontWeight={600}>-</Text>
        if(name === 'increment') return <Text style={styles.actionSymbol} fontWeight={600}>+</Text>

        return (
            <Icon
                name={name}
                filled={typeof variant === 'string' && variant === 'outlined' ? false : true}
                size={typeof size === 'number' && size}
                color={color}
            />
        )
    }

    return (
        <TouchableOpacity
            accessibilityRole="button"
            style={styles.container(name, disabled, size, color, alignSelf)}
            disabled={disabled}
            onPress={onPress}
        >
            <InnerButton />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: (name, disabled, size, color, alignSelf) => (name === 'decrement' || name === 'increment') ? ({
        width: typeof size === 'number' ? size : 18,
        height: typeof size === 'number' ? size : 18,
        backgroundColor: disabled ? colors.button.disable.background : color ? color : colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (typeof size === 'number' ? size : 18) / 2,
        alignSelf: alignSelf && alignSelf
    }) : ({
        alignSelf: alignSelf && alignSelf
    }),
    actionSymbol:
    {
        color: colors.white,
        fontSize: 16
    },
})

export default ActionButton