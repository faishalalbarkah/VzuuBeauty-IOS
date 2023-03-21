import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { ILPlaceholderImage } from '../../../assets'
import { BUCKET_URL, colors, screenWidth } from '../../../utils'

const PromoSlider = ({ data, autoplay, loop, renderImage, bottomSpace }) =>
{
    const [activeSlide, setActiveSlide] = useState(0)

    if(typeof renderImage !== 'function') return null

    return (
        <View style={styles.container(bottomSpace)}>
            <Carousel
                data={data instanceof Array ? data : []}
                renderItem={({ item, index }) => (
                    <Pressable
                        style={styles.imageWrapper(renderImage(item))}
                        key={index}
                    >
                        <Image
                            source={renderImage(item) ? { uri: `${BUCKET_URL}/${renderImage(item)}` } : ILPlaceholderImage}
                            style={styles.image(renderImage(item))}
                        />
                    </Pressable>
                )}
                sliderWidth={screenWidth}
                itemWidth={screenWidth - 30}
                onSnapToItem={index => setActiveSlide(index)}
                autoplay={autoplay}
                loop={loop}
            />
            <Pagination
                dotsLength={data instanceof Array ? data.length : 0}
                activeDotIndex={activeSlide}
                containerStyle={styles.slidePagination}
                dotContainerStyle={styles.dotContainerStyle}
                dotStyle={styles.dotStyle}
                inactiveDotOpacity={0.5}
                inactiveDotScale={1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    imageWrapper: img => ({
        height: 120,
        backgroundColor: img ? colors.white : '#eaeff1',
        borderRadius: 8
    }),
    image: img => ({
        width: '100%',
        height: '100%',
        resizeMode: img ? 'cover' : 'contain',
        borderRadius: 8
    }),
    slidePagination:
    {
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    dotContainerStyle: { marginHorizontal: 3 },
    dotStyle:
    {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: colors.primary
    }
})

export default PromoSlider