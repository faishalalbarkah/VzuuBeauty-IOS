import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { colors } from '../../../utils'
import Text from '../Text'

const PressableInput = ({ label, placeholder, value, onPress, errorMessage, bottomSpace }) =>
{
    return (
        <View style={styles.container(bottomSpace)}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Pressable style={styles.input} onPress={onPress}>
                {value ? (
                    <Text style={styles.text}>{value}</Text>
                ) : (
                    <Text style={styles.placeholder}>{placeholder}</Text>
                )}
            </Pressable>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    input:
    {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.textInput.enable.background
    },
    text:
    {
        color: colors.textInput.enable.text,
        fontSize: 14,
        lineHeight: 28
    },
    placeholder:
    {
        color: colors.text.label,
        fontSize: 14,
        lineHeight: 28
    },
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

export default PressableInput