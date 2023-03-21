import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../utils'
import { Icon, Text } from '../../atoms'

const MenuList = ({ children, title, bottomSpace }) =>
{
    return (
        <View style={styles.container(bottomSpace)}>
            {title && <Text style={styles.title} fontWeight={500}>{title}</Text>}
            <View style={styles.content}>{children}</View>
        </View>
    )
}

const Item = ({ icon, label, borderBottom, next, onPress }) =>
{
    return (
        <TouchableOpacity
            style={styles.item(borderBottom)}
            onPress={onPress}
        >
            <View style={styles.innerWrapper}>
                <Icon name={icon} size={20} color={colors.text.menuInactive} />
                <Text style={styles.label}>{label}</Text>
            </View>
            {next && <Icon name="chevron-forward" size={15} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    title:
    {
        color: colors.text.placeholder,
        fontSize: 14,
        textTransform: 'uppercase',
        marginBottom: 10
    },
    content:
    {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    item: borderBottom => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: borderBottom ? 1 : 0,
        borderBottomColor: colors.border
    }),
    innerWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label:
    {
        color: colors.text.menuInactive,
        marginLeft: 15
    }
})

MenuList.Item = Item

export default MenuList