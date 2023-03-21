import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { ILPlaceholderImage } from '../../../assets'
import { BUCKET_URL, colors, fonts, truncate } from '../../../utils'
import { PriceLabel, Text } from '../../atoms'

const ProductItem = ({ id, image, name, price, priceBeforeDiscount }) =>
{
    const navigation = useNavigation()

    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate('ProductDetail', { id })}
        >
            <Image
                style={styles.image}
                source={image ? { uri: `${BUCKET_URL}/${image}` } : ILPlaceholderImage}
            />
            <Text style={styles.itemName} fontWeight={300}>{truncate(name, 35)}</Text>
            <PriceLabel style={styles.price} value={price} />
            {priceBeforeDiscount && <PriceLabel style={styles.discount} value={priceBeforeDiscount} textStrikeThrough />}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: { padding: 7 },
    image:
    {
        width: '100%',
        height: undefined,
        aspectRatio: 1 / 1,
        borderRadius: 5
    },
    itemName:
    {
        color: colors.text.secondary,
        fontSize: 14,
        marginTop: 8,
        marginBottom: 5
    },
    price: { color: colors.text.secondary },
    discount:
    {
        color: '#dedede',
        fontFamily: fonts.primary[300],
        marginTop: 3
    }
})

export default ProductItem