import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { colors, truncate } from '../../../utils'
import { useNavigation } from '@react-navigation/native'
import { ILPlaceholderImage } from '../../../assets'
import { Text } from '../../atoms'

const ProductCategoryItem = ({ id, image, categoryName }) =>
{
    const navigation = useNavigation()

    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate('Products', { category_id: id, type: 'category' })}
        >
            <View style={styles.imageWrapper}>
                <Image
                    style={styles.image(image)}
                    source={image ? image : ILPlaceholderImage}
                />
            </View>
            <Text style={styles.desc}>{truncate(categoryName, 14)}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:
    {
        width: 50,
        marginRight: 10
    },
    imageWrapper:
    {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        backgroundColor: '#e9eef1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: image => ({
        width: image ? 30 : 42,
        height: image ? 30 : 42
    }),
    desc:
    {
        color: colors.text.secondary,
        fontSize: 11,
        textAlign: 'center',
        marginTop: 5
    }
})

export default ProductCategoryItem