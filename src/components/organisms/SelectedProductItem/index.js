import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { ILPlaceholderImage } from '../../../assets'
import { truncate } from '../../../utils'
import { Card, PriceLabel, Text } from '../../atoms'

const SelectedProductItem = ({ image, name, price, bottomSpace, actions, onPress }) =>
{
    return (
        <Pressable style={styles.container(bottomSpace)} onPress={onPress}>
            <Card flexDir="row" alignItems="flex-start">
                <Image source={image ? image : ILPlaceholderImage} style={styles.image} />
                <View style={styles.wrapper}>
                    <View>
                        <Text style={styles.name}>{truncate(name ? name : '', 35)}</Text>
                        <PriceLabel value={price} />
                    </View>
                    {React.isValidElement(actions) && actions}
                </View>
            </Card>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    image:
    {
        width: 75,
        height: 75,
        borderRadius: 5
    },
    wrapper:
    {
        flex: 1,
        height: 75,
        justifyContent: 'space-between',
        marginLeft: 10
    },
    name:
    {
        fontSize: 14,
        marginBottom: 5
    }
})

export default SelectedProductItem