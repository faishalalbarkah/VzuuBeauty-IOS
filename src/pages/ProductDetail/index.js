import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Share from 'react-native-share'
import { useDispatch, useSelector } from 'react-redux'
import {
    BottomSection,
    Button,
    Card,
    Header,
    Icon,
    Loading,
    MainLayout,
    PressableLabel,
    PriceLabel,
    ProductDetailSlider,
    Text,
    WholesalePriceList
} from '../../components'
import { addOrSubtractCartAction, addWishlistAction, getProductDetailAction, getWishlistsAction, removeWishlistAction } from '../../services'
import { BUCKET_URL, colors, rupiahFormatter, showSuccess } from '../../utils'

const ProductDetail = ({ navigation, route }) =>
{
    const [wishlist, setWishlist] = useState(null)

    const dispatch = useDispatch()
    const { data: productDetail, isLoading } = useSelector(state => state.productDetail)
    const { isLoading: addOrSubtractIsLoading } = useSelector(state => state.addOrSubtractCart)

    const shareHandler = (productName, price, slug) =>
    {
        let data = {
            title: productName,
            message: `Dapatkan produk ${productName} seharga ${rupiahFormatter(price)} dengan mengklik link berikut: https://vzuubeauty.com/produk/${slug}`
        }

        Share.open(data)
            .then(result => console.log(result))
            .catch(error => error && console.log(error))
    }

    const addToCartHandler = productId =>
    {
        const form = { product_id: productId }
        const res = {
            succeed: () => showSuccess('Berhasil ditambahkan ke Keranjang.')
        }

        dispatch(addOrSubtractCartAction(form, res))
    }

    const getWishlistsHandler = () =>
    {
        const res = {
            succeed: result =>
            {
                const filtered = result.filter(item => item.product_id === route.params.id)
                setWishlist(filtered[0])
            }
        }

        dispatch(getWishlistsAction(null, res))
    }

    const addOrRemoveWishlistHandler = productId =>
    {
        if(wishlist)
        {
            const form = { id: wishlist.id }
            const res = {
                succeed: () =>
                {
                    setWishlist(null)
                    showSuccess('Berhasil dihapus dari Daftar Keinginan.')
                }
            }

            dispatch(removeWishlistAction(form, res))
        }
        else
        {
            const form = { product_id: productId }
            const res = {
                succeed: () =>
                {
                    getWishlistsHandler()
                    showSuccess('Berhasil ditambahkan ke Daftar Keinginan.')
                }
            }

            dispatch(addWishlistAction(form, res))
        }
    }

    useEffect(() =>
    {
        if(route.params) dispatch(getProductDetailAction(route.params))
        getWishlistsHandler()
    }, [])

    return (
        <>
            <MainLayout>
                <Header
                    title="Detail Produk"
                    goBack={navigation.goBack}
                    cartButton
                />
                {isLoading && (<Loading type="inner" />)}
                {productDetail && (
                    <>
                        <MainLayout.Content disablePadding>
                            <ProductDetailSlider
                                data={productDetail.product_images}
                                renderImage={item => ({ uri: `${BUCKET_URL}/${item.image}` })}
                                renderPreviewImage={item => ({ url: `${BUCKET_URL}/${item.image}` })}
                                bottomSpace={10}
                            />
                            <Card
                                alignItems="flex-start"
                                padding={15}
                                horizontalSpace={15}
                                bottomSpace={10}
                            >
                                <Text style={styles.productName}>{productDetail.name}</Text>
                                <PriceLabel
                                    value={productDetail.price}
                                    color={colors.text.secondary}
                                    textSize={16}
                                    lineHeight={23}
                                />
                                <Text style={styles.stock}>Stok tersisa: {productDetail.stock}</Text>
                                <View style={styles.additionalInfo}>
                                    {productDetail.total_sold > 0 && (
                                        <Text style={styles.sold}>Terjual {productDetail.total_sold}</Text>
                                    )}
                                    {(typeof productDetail.review_rate !== undefined || productDetail.review_rate !== null) && (
                                        <PressableLabel
                                            icon="star"
                                            label={productDetail.review_rate}
                                            value={productDetail.review_count}
                                            leftSpace={productDetail.total_sold > 0 && 10}
                                            onPress={() => navigation.navigate('Review', { id: productDetail.id })}
                                        />
                                    )}
                                </View>
                            </Card>
                            
                            {productDetail.product_prices && productDetail.product_prices.length > 0 && (
                                <Card
                                    title="Diskon produk"
                                    alignItems="flex-start"
                                    padding={15}
                                    horizontalSpace={15}
                                    bottomSpace={10}
                                >
                                    <WholesalePriceList
                                        data={productDetail.product_prices}
                                        renderItem={(item, index) => (
                                            <WholesalePriceList.Item
                                                quantity={{ min: item.qty_min, max: item.qty_max }}
                                                price={item.price}
                                                key={index}
                                            />
                                        )}
                                        topSpace={15}
                                        bottomSpace={10}
                                    />
                                </Card>
                            )}

                            <Card
                                title="Deskripsi produk"
                                alignItems="flex-start"
                                padding={15}
                                horizontalSpace={15}
                                bottomSpace={15}
                            >
                                <Text style={styles.desc}>
                                    {productDetail.description}
                                </Text>
                            </Card>
                        </MainLayout.Content>
                        <BottomSection>
                            <Button
                                variant="outlined"
                                size={43}
                                rightSpace={10}
                                onPress={() => shareHandler(productDetail.name, productDetail.price, productDetail.slug)}
                            >
                                <Icon name="share" color={colors.primary} />
                            </Button>
                            <View style={styles.buttonWrapper}>
                                <Button
                                    title={productDetail.stock === 0 ? 'Stok Habis' : '+ Keranjang'}
                                    disabled={productDetail.stock === 0}
                                    onPress={() => addToCartHandler(productDetail.id)}
                                />
                            </View>
                            <Button
                                variant="outlined"
                                size={43}
                                leftSpace={10}
                                onPress={() => addOrRemoveWishlistHandler(productDetail.id)}
                            >
                                <Icon
                                    name="love"
                                    filled={wishlist && true}
                                    color={colors.primary}
                                />
                            </Button>
                        </BottomSection>
                    </>
                )}
            </MainLayout>
            {addOrSubtractIsLoading && <Loading />}
        </>
    )
}

const styles = StyleSheet.create({
    productName:
    {
        color: colors.text.secondary,
        fontSize: 18,
        marginBottom: 5
    },
    stock:
    {
        color: colors.primary,
        fontSize: 12
    },
    additionalInfo:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    sold: { fontSize: 12 },
    desc:
    {
        color: colors.text.secondary,
        fontSize: 14,
        lineHeight: 21,
        paddingVertical: 10
    },
    buttonWrapper: { flex: 1 }
})

export default ProductDetail