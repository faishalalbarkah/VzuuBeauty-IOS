import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../../../utils'
import Icon from '../Icon'
import Text from '../Text'

const Input = ({ label, icon, variant, disable, disableBgColor, numberOfLines, errorMessage, bottomSpace, ...rest }) =>
{
    const [border, setBorder] = useState(colors.border)

    const onFocusForm = () => setBorder(colors.primary)
    const onBlurForm = () => setBorder(colors.border)

    return (
        <View style={styles.container(border, icon, !disable, disableBgColor, bottomSpace)}>
            {typeof label === 'string' && <Text style={styles.label}>{label}</Text>}
            {typeof icon === 'string' && (
                <View style={styles.iconWrapper}>
                    <Icon name={icon} filled size={18} color="#999999" />
                </View>
            )}
            <TextInput
                style={styles.input(border, icon, variant, !disable, disableBgColor, numberOfLines)}
                onFocus={onFocusForm}
                onBlur={onBlurForm}
                editable={!disable}
                selectTextOnFocus={!disable}
                numberOfLines={numberOfLines}
                {...rest}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: (border, icon, editable, disableBgColor, bottomSpace) => typeof icon === 'string' ? ({
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: border,
        borderRadius: 8,
        backgroundColor: editable === false
            ? colors.textInput.disable.background
            : disableBgColor ? 'transparent' : colors.textInput.enable.background,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }) : ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    iconWrapper:
    {
        paddingLeft: 15,
        alignItems: 'center'
    },
    input: (border, icon, variant, editable, disableBgColor, numberOfLines) => typeof icon === 'string' ? ({
        color: editable === false ? colors.textInput.disable.text : colors.textInput.enable.text,
        borderRadius: 8,
        paddingVertical: variant === 'small' ? 7 : 10,
        paddingLeft: 10,
        paddingRight: 15,
        fontSize: 14,
        flex: 1
    }) : ({
        color: editable === false ? colors.textInput.disable.text : colors.textInput.enable.text,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        paddingTop: typeof numberOfLines === 'number' ? 15 : undefined,
        backgroundColor: editable === false
            ? colors.textInput.disable.background
            : disableBgColor ? 'transparent' : colors.textInput.enable.background,
        fontSize: 14,
        textAlignVertical: typeof numberOfLines === 'number' ? 'top' : undefined
    }),
    label:
    {
        color: colors.text.secondary,
        fontSize: 14,
        marginBottom: 5,
        marginLeft: 5
    },
    error:
    {
        color: colors.error,
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5
    }
})

export default Input