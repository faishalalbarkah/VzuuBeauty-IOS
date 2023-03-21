import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, EmptyData, Header, Icon, Loading, MainLayout, SelectedProductItem } from '../../components'
import { addOrSubtractCartAction, getWishlistsAction, removeWishlistAction } from '../../services'
import { BUCKET_URL, colors, showSuccess } from '../../utils'

const Wishlists = ({ navigation }) =>
{
    const [wishlists, setWishlists] = useState(null)
    const [isFirstLoad, setIsFirstLoad] = useState(true)

    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.wishlists)
    const { isLoading: addOrSubtractIsLoading } = useSelector(state => state.addOrSubtractCart)

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
                setWishlists(result)
                if(isFirstLoad) setIsFirstLoad(false)
            }
        }

        dispatch(getWishlistsAction(null, res))
    }

    const removeWishlistHandler = wishlistId =>
    {
        const form = { id: wishlistId }
        const res = {
            succeed: () =>
            {
                getWishlistsHandler()
                showSuccess('Berhasil dihapus dari Daftar Keinginan.')
            }
        }

        dispatch(removeWishlistAction(form, res))
    }

    useEffect(() =>
    {
        getWishlistsHandler()
    }, [])

    return (
        <>
            <MainLayout>
                <Header
                    title="Daftar Keinginan"
                    goBack={navigation.goBack}
                    cartButton
                />
                {(isLoading && isFirstLoad) && (<Loading type="inner" />)}
                {wishlists && (
                    <>
                        <MainLayout.Content>
                            {wishlists.length > 0 ? (
                                wishlists.map((item, index) => (
                                    <SelectedProductItem
                                        image={item.image && { uri: `${BUCKET_URL}/${item.image}` }}
                                        name={item.product_name}
                                        price={item.original_price}
                                        bottomSpace={(index+1) !== wishlists.length ? 10 : 30}
                                        onPress={() => navigation.navigate('ProductDetail', { id: item.product_id })}
                                        actions={
                                            <View style={styles.actionGroup}>
                                                <TouchableOpacity
                                                    style={styles.removeButton}
                                                    onPress={() => removeWishlistHandler(item.id)}
                                                >
                                                    <Icon name="trash-bin" size={15} />
                                                </TouchableOpacity>
                                                <View style={styles.buttonWrapper}>
                                                    <Button
                                                        title="+ Keranjang"
                                                        variant="small-outlined"
                                                        onPress={() => addToCartHandler(item.product_id)}
                                                    />
                                                </View>
                                            </View>
                                        }
                                        key={index}
                                    />
                                ))
                            ) : (
                                <EmptyData type="wishlist" message="Daftar Keinginan masih kosong." topSpace={150} />
                            )}
                        </MainLayout.Content>
                    </>
                )}
            </MainLayout>
            {addOrSubtractIsLoading && <Loading />}
        </>
    )
}

const styles = StyleSheet.create({
    actionGroup:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    removeButton:
    {
        width: 26,
        height: 26,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        backgroundColor: colors.textInput.enable.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    buttonWrapper: { flex: 1 }
})

export default Wishlists