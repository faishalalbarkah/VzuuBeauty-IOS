import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ILEmptyAddress, ILEmptyCart, ILEmptyData, ILEmptyProduct, ILEmptyWishlist } from '../../../assets'
import { colors } from '../../../utils'
import { Text } from '../../atoms'

const EmptyData = ({ type, message, topSpace, bottomSpace }) =>
{
    const Illustration = () =>
    {
        if(type === 'address') return <ILEmptyAddress width={150} height={150} />
        if(type === 'cart') return <ILEmptyCart width={150} height={150} />
        if(type === 'product') return <ILEmptyProduct width={150} height={150} />
        if(type === 'wishlist') return <ILEmptyWishlist width={150} height={150} />

        return <ILEmptyData width={150} height={150} />
    }

    return (
        <View style={styles.container(topSpace, bottomSpace)}>
            <Illustration />
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: (topSpace, bottomSpace) => ({
        alignItems: 'center',
        marginTop: typeof topSpace === 'number' ? topSpace : 0,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    text:
    {
        color: colors.text.secondary,
        fontSize: 14,
        marginTop: 15
    }
})

export default EmptyData