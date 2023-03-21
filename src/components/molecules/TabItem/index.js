import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../../utils'
import { Icon, Text } from '../../atoms'

const TabItem = ({ title, icon, active, onPress, onLongPress }) =>
{
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Icon
                name={icon}
                filled
                size={20}
                color={active ? colors.text.menuActive : colors.text.menuInactive}
            />
            <Text style={styles.text(active)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    container: { alignItems: 'center' },
    text: (active) => ({
        fontSize: 10,
        color: active ? colors.text.menuActive : colors.text.menuInactive,
        marginTop: 5
    })
})