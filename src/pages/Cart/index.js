import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    ActionButton,
    BottomSection,
    Button,
    ConfirmationDialog,
    EmptyData,
    Gap,
    Header,
    Loading,
    MainLayout,
    SelectedProductItem,
    Text
} from '../../components'
import { addOrSubtractCartAction, getCartDataAction, removeFromCartAction } from '../../services'
import { BUCKET_URL, colors } from '../../utils'

const Cart = ({ navigation }) =>
{
    const [cart, setCart] = useState(null)
    const [isFirstLoad, setIsFirstLoad] = useState(true)

    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.getCartData)

    const confirmationRef = useRef()

    const getCartDataHandler = () =>
    {
        const res = {
            succeed: result =>
            {
                setCart(result)
                if(isFirstLoad) setIsFirstLoad(false)
            }
        }

        dispatch(getCartDataAction(null, res))
    }

    const removeFromCartHandler = id =>
    {
        const form = { id, delete_type: 'one' }
        const res = { succeed: getCartDataHandler }

        dispatch(removeFromCartAction(form, res))
    }

    const subtractFromCartHandler = productId =>
    {
        const form = { product_id: productId, count_type: 'subtract_qty' }
        const res = { succeed: getCartDataHandler }

        dispatch(addOrSubtractCartAction(form, res))
    }

    const addToCartHandler = productId =>
    {
        const form = { product_id: productId }
        const res = { succeed: getCartDataHandler }

        dispatch(addOrSubtractCartAction(form, res))
    }

    const clearAllHandler = () =>
    {
        const form = { delete_type: 'all' }
        const res = {
            succeed: () =>
            {
                getCartDataHandler()
                confirmationRef.current.close()
            }
        }

        dispatch(removeFromCartAction(form, res))
    }

    useEffect(() =>
    {
        getCartDataHandler()
    }, [])

    return (
        <MainLayout>
            <Header
                title="Keranjang"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            {(isLoading && isFirstLoad) && (<Loading type="inner" />)}
            {cart && (
                <>
                    <MainLayout.Content scrollable={cart.length > 0 ? true : false}>
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <SelectedProductItem
                                    image={item.product.product_image.image && { uri: `${BUCKET_URL}/${item.product.product_image.image}` }}
                                    name={item.product.name}
                                    price={item.price}
                                    bottomSpace={(index+1) !== cart.length ? 10 : 30}
                                    onPress={() => navigation.navigate('ProductDetail', { id: item.product_id })}
                                    actions={
                                        <View style={styles.actionGroup}>
                                            <ActionButton
                                                name="trash-bin"
                                                size={18}
                                                color={colors.button.tertiary.text}
                                                onPress={() => removeFromCartHandler(item.id)}
                                            />
                                            <Gap width={20} />
                                            <ActionButton
                                                name="decrement"
                                                disabled={item.qty <= 1}
                                                onPress={() => subtractFromCartHandler(item.product_id)}
                                            />
                                            <View style={styles.itemCountWrapper}>
                                                <Text style={styles.itemCount}>{item.qty}</Text>
                                            </View>
                                            <ActionButton
                                                name="increment"
                                                disabled={item.qty >= item.product.stock}
                                                onPress={() => addToCartHandler(item.product_id)}
                                            />
                                        </View>
                                    }
                                    key={index}
                                />
                            ))
                        ) : (
                            <View style={styles.emptyData}>
                                <EmptyData
                                    type="cart"
                                    message="Keranjang masih kosong."
                                    topSpace={-150}
                                    bottomSpace={25}
                                />
                                <View style={styles.callToAction}>
                                    <Button
                                        title="Belanja Sekarang"
                                        onPress={() => navigation.navigate('Home')}
                                    />
                                </View>
                            </View>
                        )}
                    </MainLayout.Content>
                    {cart.length > 0 &&
                        <BottomSection>
                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Hapus Semua"
                                    onPress={() => confirmationRef.current.open()}
                                    variant="outlined"
                                />
                            </View>
                            <Gap width={10} />
                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Beli"
                                    onPress={() => navigation.navigate('Shipment')}
                                />
                            </View>
                        </BottomSection>
                    }
                </>
            )}
            <ConfirmationDialog
                ref={confirmationRef}
                message={`Apa kamu yakin ingin menghapus \nsemua produk dari keranjang?`}
                onSubmit={clearAllHandler}
            />
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    actionGroup:
    {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    itemCountWrapper:
    {
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    itemCount: { fontSize: 12 },
    emptyData:
    {
        flex: 1,
        justifyContent: 'center'
    },
    callToAction:
    {
        width: 200,
        alignSelf: 'center'
    },
    buttonWrapper: { flex: 1 }
})

export default Cart