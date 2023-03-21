import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { ILPlaceholderImage } from '../../../assets'
import { colors, truncate } from '../../../utils'
import { Badge, Button, Card, PriceLabel, Text } from '../../atoms'

const TransactionHistoryItem = ({ date, status, image, name, quantity, price, bottomSpace, actionButton, onPress }) =>
{
    return (
        <Pressable style={styles.container(bottomSpace)} onPress={onPress}>
            <Card paddingHorizontal={10} paddingVertical={0}>
                {(typeof date === 'string' || (typeof status === 'object' && status !== null)) && (
                    <View style={styles.header}>
                        {typeof date === 'string' && (
                            <Text style={styles.date}>{date}</Text>
                        )}
                        {(typeof status === 'object' && status !== null) && (
                            <Badge text={status.label} type={status.statusText} />
                        )}
                    </View>
                )}
                <View style={styles.content}>
                    <Image source={image ? image : ILPlaceholderImage} style={styles.image} />
                    <View style={styles.wrapper}>
                        <View>
                            <Text style={styles.name}>{truncate(name ? name : '', 35)}</Text>
                            {typeof quantity === 'number' && <Text style={styles.quantity}>{quantity} barang</Text>}
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View>
                        {price && (
                            <>
                                <Text style={styles.label}>Total belanja:</Text>
                                <PriceLabel value={price} textSize={14} textType="medium" />
                            </>
                        )}
                    </View>
                    {(typeof actionButton === 'object' && actionButton !== null) && (
                        <Button
                            title={actionButton.text}
                            variant={typeof actionButton.buttonVariant === 'string' ? actionButton.buttonVariant : 'small'}
                            onPress={actionButton.onPress}
                        />
                    )}
                </View>
            </Card>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    header:
    {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: colors.border
    },
    date: { fontSize: 12 },
    content:
    {
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 5,
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
        justifyContent: 'space-between',
        marginLeft: 10
    },
    name:
    {
        fontSize: 14,
        marginBottom: 5
    },
    quantity:
    {
        color: colors.text.secondary,
        fontSize: 11
    },
    footer:
    {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        paddingHorizontal: 5
    },
    label:
    {
        fontSize: 12,
        marginBottom: 3
    },
})

export default TransactionHistoryItem