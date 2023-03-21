import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { colors } from '../../../utils'
import { PriceLabel, Text } from '../../atoms'

const WholesalePriceList = ({ data, renderItem, topSpace, bottomSpace }) =>
{
    return (
        
        <View style={styles.container(topSpace, bottomSpace)}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {data && data.map((item, index) => renderItem(item, index))}
            </ScrollView>
        </View>
    )
}

const Item = ({ quantity, price }) =>
{
    return (
        <View style={styles.item}>
            <Text style={styles.qtyRange}>
                {quantity.max ? `${quantity.min} - ${quantity.max}` : `>= ${quantity.min}`}
            </Text>
            <PriceLabel
                style={styles.price}
                value={price}
                textType="medium"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: (topSpace, bottomSpace) => ({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: typeof topSpace === 'number' ? topSpace : 0,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    item:
    {
        minWidth: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 8,
        marginRight: 5
    },
    qtyRange:
    {
        color: colors.text.secondary,
        fontSize: 12,
        marginBottom: 3
    },
    price:
    {
        color: colors.text.secondary,
        fontSize: 12
    }
})

WholesalePriceList.Item = Item

export default WholesalePriceList