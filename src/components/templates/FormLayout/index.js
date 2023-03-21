import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { colors } from '../../../utils'
import { Text } from '../../atoms'

const FormLayout = ({ children, image, svgImage, title, desc, topSpace }) =>
{
    return (
        <View style={styles.page(topSpace)}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {image &&
                        <View style={[styles.imageWrapper, image.wrapperStyle]}>
                            <Image
                                source={image.source ? image.source : image}
                                style={styles.image}
                            />
                        </View>
                    }
                    {svgImage &&
                        <View style={[styles.imageWrapper, svgImage.wrapperStyle]}>
                            {svgImage.component ? svgImage.component : svgImage}
                        </View>
                    }
                    {title &&
                        <View style={styles.header}>
                            <Text style={styles.title} fontWeight={500}>{title}</Text>
                            {desc && <Text style={styles.desc}>{desc}</Text>}
                        </View>
                    }
                    {children}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: topSpace => ({
        flex: 1,
        backgroundColor: colors.white,
        padding: 45,
        paddingTop: typeof topSpace === 'number' ? topSpace : 0
    }),
    safeAreaView: { flex: 1 },
    imageWrapper: { alignItems: 'center' },
    image:
    {
        resizeMode: 'contain',
        width: 185,
        height: 185
    },
    header:
    {
        paddingLeft: 5,
        marginBottom: 20
    },
    title:
    {
        color: colors.text.secondary,
        fontSize: 25,
        lineHeight: 32
    },
    desc:
    {
        color: colors.text.label,
        fontSize: 14,
        lineHeight: 21
    }
})

export default FormLayout