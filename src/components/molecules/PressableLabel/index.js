import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Gap, Icon, Text } from '../../atoms'

const PressableLabel = ({ icon, label, value, leftSpace, onPress }) =>
{
    return (
        <Pressable style={styles.container(leftSpace)} onPress={onPress}>
            {typeof icon === 'string' && (
                <>
                    <Icon name={icon} filled size={12} color="#FFEB3B" />
                    <Gap width={5} />
                </>
            )}
            <Text style={styles.label}>{label} <Text style={styles.value}>({value})</Text></Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: leftSpace => ({
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: typeof leftSpace === 'number' ? leftSpace : 0
    }),
    label:
    {
        fontFamily: fonts.primary[500],
        fontSize: 12
    },
    value: { fontFamily: fonts.primary[300] }
})

export default PressableLabel