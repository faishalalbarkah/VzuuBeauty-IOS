import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { colors } from '../../../utils'

const SelectableCardList = ({ data, currentActive, renderItem }) =>
{
    const [active, setActive] = useState(0)

    useEffect(() =>
    {
        setActive(currentActive)
    }, [currentActive])

    return (
        <>
            {data &&
                data.map((item, index) =>
                {
                    item.active = active
                    item.setActive = setActive
                    return renderItem(item, index)
                })}
        </>
    )
}

const Item = ({ children, value, onPress, bottomSpace }) =>
{
    return (
        <Pressable
            style={styles.item(value.id, value.active, bottomSpace)}
            onPress={() =>
            {
                value.setActive(value.id)
                onPress && onPress(value)
            }}
        >
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: (currentItem, active, bottomSpace) => ({
        borderWidth: 1,
        borderColor: currentItem === active ? 'rgba(230, 176, 170, 0.7)' : colors.border,
        borderRadius: 8,
        padding: 15,
        backgroundColor: currentItem === active ? 'rgba(230, 176, 170, 0.15)' : colors.white,
        flexDirection: 'row',
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    })
})

SelectableCardList.Item = Item

export default SelectableCardList