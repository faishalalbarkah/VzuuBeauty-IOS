import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalCartDataAction } from '../../../services'
import { colors } from '../../../utils'
import { ActionButton, Logo } from '../../atoms'
import { CartButton } from '../../molecules'

const Header = ({ title, logo, goBack, goBackWidth, cartButton, filterButton }) =>
{
    const [itemCount, setItemCount] = useState(null)

    const dispatch = useDispatch()
    const { data: addOrSubtract } = useSelector(state => state.addOrSubtractCart)
    const { data: removeFromCart } = useSelector(state => state.removeFromCart)

    const getTotalCartDataHandler = () =>
    {
        const res = { succeed: result => setItemCount(result) }

        dispatch(getTotalCartDataAction(null, res))
    }

    useEffect(() =>
    {
        getTotalCartDataHandler()
    }, [addOrSubtract.code === 200, removeFromCart.code === 200])

    return (
        <View style={styles.container}>
            {goBack && (
                <View style={styles.buttonWrapper('back-button', goBackWidth)}>
                    <ActionButton
                        name="chevron-back"
                        variant="outlined"
                        color="#757575"
                        alignSelf="flex-start"
                        onPress={goBack}
                    />
                </View>
            )}
            {logo && <View style={styles.buttonWrapper()}><Logo /></View>}
            <View style={styles.titleWrapper}>
                <Text style={styles.title(goBack, cartButton, filterButton)}>{title}</Text>
            </View>
            {cartButton && (
                <View style={styles.buttonWrapper()}>
                    <CartButton itemCount={itemCount && itemCount.total} disabled={cartButton.isPressable === false} />
                </View>
            )}
            {filterButton && (
                <View style={styles.buttonWrapper('filter-button')}>
                    <ActionButton
                        name="filter"
                        variant="outlined"
                        color="#757575"
                        alignSelf="flex-end"
                        onPress={filterButton.onPress}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: colors.white
    },
    buttonWrapper: (buttonVariant, goBackWidth) => ({
        width: buttonVariant === 'filter-button' ? 30 : typeof goBackWidth === 'number' ? goBackWidth : 50,
        alignItems: 'center'
    }),
    titleWrapper:
    {
        flex: 1,
        justifyContent: 'center'
    },
    title: (goBack, cartButton, filterButton) => ({
        color: colors.text.secondary,
        fontSize: 14,
        textAlign: goBack ? (goBack && cartButton ? 'center' : 'left') : 'center',
        marginLeft: (cartButton && filterButton) ? 30 : 0
    })
})

export default React.memo(Header, (prev, next) =>
{
    return prev.value === next.value
})