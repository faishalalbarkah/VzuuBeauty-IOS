import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { colors, usePrevious } from '../../../utils'
import { Gap, Text } from '../../atoms'

const SelectableItem = ({ data, currentActive, onReset, topSpace, itemOuterGap, renderItem }) =>
{
    const [active, setActive] = useState(currentActive ? currentActive : null)
    const activeStatus = { active, setActive }
    const prevActive = usePrevious(currentActive)

    const resetSelectedItem = () =>
    {
        setActive(null)
        onReset()
    }

    useEffect(() =>
    {
        if(currentActive === '' && prevActive !== '') setActive(null)
    }, [currentActive])

    return (
        <View style={styles.container(topSpace)}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {typeof itemOuterGap === 'number' && (<Gap width={itemOuterGap} />)}
                {(typeof onReset === 'function' && active !== null) && (
                    <Item
                        value="empty"
                        label="x"
                        variant="big"
                        activeStatus={activeStatus}
                        onPress={resetSelectedItem}
                    />
                )}
                {data &&
                    data.map((item, index) =>
                    {
                        item.active_status = activeStatus
                        return (renderItem(item, index))
                    })}
                {typeof itemOuterGap === 'number' && (<Gap width={itemOuterGap >= 5 ? itemOuterGap-5 : itemOuterGap} />)}
            </ScrollView>
        </View>
    )
}

const Item = ({ value, label, variant, activeStatus, onPress }) =>
{
    const updateSelectedItem = (selectedValue) =>
    {
        activeStatus.setActive(selectedValue)
        onPress(selectedValue)
    }

    return (
        <Pressable
            style={styles.item(variant, activeStatus.active, value)}
            onPress={() => updateSelectedItem(value)}
        >
            <Text style={styles.itemText(variant, activeStatus.active, value)}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: topSpace => ({
        flexDirection: 'row',
        marginTop: typeof topSpace === 'number' ? topSpace : 0
    }),
    item: (variant, active, currentItem) => ({
        borderWidth: 1,
        borderColor: active === currentItem ? 'rgba(230, 176, 170, 0.7)' : colors.border,
        borderRadius: variant === 'big' ? 10 : 8,
        paddingVertical: variant === 'big' ? 8 : 5,
        paddingHorizontal: variant === 'big' ? 12 : 10,
        backgroundColor: active === currentItem ? 'rgba(230, 176, 170, 0.15)' : colors.white,
        alignSelf: 'flex-start',
        marginRight: 5
    }),
    itemText: (variant, active, currentItem) => ({
        color: active === currentItem ? colors.primary : colors.text.placeholder,
        fontSize: variant === 'big' ? 14 : 12
    })
})

SelectableItem.Item = Item

export default SelectableItem