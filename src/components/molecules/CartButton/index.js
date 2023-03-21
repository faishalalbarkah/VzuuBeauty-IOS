import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../utils'
import { Icon, Text } from '../../atoms'

const CartButton = ({ itemCount, disabled }) =>
{
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            accessibilityRole="button"
            style={styles.container}
            disabled={disabled}
            onPress={() => navigation.navigate('Cart')}
        >
            <Icon name="cart" size={28} color="#757575" />
            {itemCount > 0 && (
                <View style={styles.itemCountWrapper}>
                    <Text style={styles.itemCount}>{itemCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: { alignSelf: 'flex-end', paddingRight: 7 },
    itemCountWrapper:
    {
        width: 20,
        height: 20,
        backgroundColor: colors.error,
        borderRadius: 20 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -7,
        right: -3
    },
    itemCount:
    {
        color: colors.white,
        fontSize: 8
    }
})

export default CartButton