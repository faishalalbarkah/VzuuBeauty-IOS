import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { ILPlaceholderImage } from '../../../assets'
import { colors, truncate } from '../../../utils'
import { PriceLabel, Text } from '../../atoms'

const PurchaseItem = ({ image, name, quantity, weight, price, bottomSpace }) =>
{
    return (
        <View style={styles.container(bottomSpace)}>
            <Image source={image ? image : ILPlaceholderImage} style={styles.image} />
            <View style={styles.wrapper}>
                <Text style={styles.name}>{truncate(name ? name : '', 35)}</Text>
                <Text style={styles.quantity}>{quantity} barang ({weight} gr)</Text>
                <PriceLabel value={price} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        flexDirection: 'row',
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    image:
    {
        width: 55,
        height: 55,
        borderRadius: 5
    },
    wrapper:
    {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    },
    name:
    {
        fontSize: 14,
        lineHeight: 17
    },
    quantity:
    {
        color: colors.text.secondary,
        fontSize: 11,
        lineHeight: 19
    }
})

export default PurchaseItem