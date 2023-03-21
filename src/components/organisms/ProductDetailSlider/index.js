import React, { useState } from 'react'
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { ILPlaceholderImage } from '../../../assets'
import { colors, screenWidth } from '../../../utils'

const ProductDetailSlider = ({ data, autoplay, loop, renderImage, renderPreviewImage, bottomSpace }) =>
{
    const [activeSlide, setActiveSlide] = useState(0)
    const [previewImage, setPreviewImage] = useState({
        isShown: false,
        currentIndex: 0
    })

    if(typeof renderImage !== 'function') return null

    const previewImages = renderPreviewImage && data instanceof Array ? data.map(item => renderPreviewImage(item)) : []

    const closeImageHandler = () =>
    {
        setPreviewImage({
            ...previewImage,
            isShown: false,
        })
    }
    
    return (
        <>
            <View style={styles.container(bottomSpace)}>
                <Carousel
                    data={data instanceof Array ? data : []}
                    renderItem={({ item, index }) => (
                        <Pressable
                            style={styles.imageWrapper(renderImage(item))}
                            onPress={() => renderPreviewImage && setPreviewImage({
                                ...previewImage,
                                isShown: true,
                                currentIndex: index
                            })}
                            key={index}
                        >
                            <Image
                                source={renderImage(item) ? renderImage(item) : ILPlaceholderImage}
                                style={styles.image(renderImage(item))}
                            />
                        </Pressable>
                    )}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
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

            {previewImage.isShown && (
                <Modal visible={true} transparent={true} onRequestClose={closeImageHandler}>
                    <ImageViewer
                        onCancel={closeImageHandler}
                        enableSwipeDown
                        imageUrls={previewImages}
                        index={previewImage.currentIndex}
                    />
                </Modal>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    imageWrapper: img => ({
        height: 300,
        backgroundColor: img ? colors.white : '#eaeff1',
        borderRadius: 8
    }),
    image: img => ({
        width: '100%',
        height: '100%',
        resizeMode: img ? 'cover' : 'contain'
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

export default ProductDetailSlider