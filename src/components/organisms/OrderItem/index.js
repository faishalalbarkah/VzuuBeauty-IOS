import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { ILPlaceholderImage } from '../../../assets'
import { colors, truncate } from '../../../utils'
import { Button, Card, PriceLabel, Text } from '../../atoms'

const OrderItem = ({ image, name, price, quantity, isReviewButtonShowed, goToCreateReview, bottomSpace }) =>
{
    return (
        <Card
            alignItems="flex-start"
            outlineColor={colors.border}
            rounded="sm"
            bottomSpace={bottomSpace}
        >
            <View style={styles.content}>
                <Image source={image ? image : ILPlaceholderImage} style={styles.image} />
                <View style={styles.wrapper}>
                    <View>
                        <Text style={styles.name}>{truncate(name ? name : '', 35)}</Text>
                        <View style={styles.priceWrapper}>
                            <PriceLabel value={price} textType="regular" />
                            <Text style={styles.quantity}> x {quantity}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <View>
                    <Text style={styles.label}>Total harga</Text>
                    <PriceLabel value={price * quantity} textSize={14} textType="medium" />
                </View>
                {(typeof isReviewButtonShowed === 'boolean' && isReviewButtonShowed === true) && (
                    <View style={styles.rightItem}>
                        <View style={styles.buttonWrapper}>
                            <Button
                                title="Beri Ulasan"
                                variant="small"
                                onPress={goToCreateReview}
                            />
                        </View>
                    </View>
                )}
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    content:
    {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 10
    },
    image:
    {
        width: 45,
        height: 45,
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
        marginBottom: 5
    },
    priceWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: { fontSize: 12 },
    footer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    totalPriceWrapper: { paddingTop: 10 },
    label:
    {
        color: colors.text.secondary,
        fontSize: 12,
        marginBottom: 2
    },
    rightItem:
    {
        flex: 1,
        marginLeft: 15,
        alignItems: 'flex-end'
    },
    buttonWrapper: { width: 100 }
})

export default OrderItem