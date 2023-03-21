import React, { forwardRef } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { colors, fonts } from '../../../utils'
import { Button, Gap, Input, Text } from '../../atoms'
import { SelectableItem } from '../../molecules'

const FilterProduct = forwardRef(({ children, title, reset, isResetShown, disabled, onSubmit }, ref) =>
{
    return (
        <RBSheet
            ref={ref}
            height={300}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{ container: styles.container }}
        >
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title ? title : 'Filter'}</Text>
                {isResetShown && <Text style={styles.pressableText} onPress={reset}>Reset</Text>}
            </View>
            <ScrollView style={styles.wrapper}>
                {children}
                <Button
                    title="Terapkan"
                    onPress={onSubmit}
                    disabled={disabled}
                />
            </ScrollView>
        </RBSheet>
    )
})

const FilterByPrice = ({ title, value, onChangeText, bottomSpace }) =>
{
    return (
        <View style={styles.content(bottomSpace)}>
            <Text style={styles.label}>{title ? title : 'Harga'}</Text>
            <View style={styles.inputWrapper}>
                <View style={styles.input}>
                    <Input
                        placeholder="Rp Terendah"
                        value={value.min}
                        onChangeText={val => onChangeText.min(val)}
                        keyboardType="numeric"
                    />
                </View>
                <Gap width={10}/>
                <View style={styles.input}>
                    <Input
                        placeholder="Rp Tertinggi"
                        value={value.max}
                        onChangeText={val => onChangeText.max(val)}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    )
}

const SortBy = ({ title, value, onChange, bottomSpace }) =>
{
    const options = [
        {
            value: 'sales',
            label: 'Terlaris'
        },
        {
            value: 'desc',
            label: 'Harga Tertinggi'
        },
        {
            value: 'asc',
            label: 'Harga Terendah'
        }
    ]

    return (
        <View style={styles.content(bottomSpace)}>
            <Text style={styles.label}>{title ? title : 'Urutkan'}</Text>
            <SelectableItem
                data={options}
                currentActive={value}
                renderItem={(item, index) => (
                    <SelectableItem.Item
                        value={item.value}
                        label={item.label}
                        activeStatus={item.active_status}
                        onPress={val => onChange(val)}
                        key={index}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    titleWrapper:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    title:
    {
        fontFamily: fonts.primary[500],
        fontSize: 16
    },
    pressableText:
    {
        color: colors.primary,
        fontFamily: fonts.primary[500],
        fontSize: 12
    },
    wrapper: { padding: 15 },
    content: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    label:
    {
        fontFamily: fonts.primary[500],
        fontSize: 14,
        lineHeight: 21,
        marginBottom: 5
    },
    inputWrapper: { flexDirection: 'row' },
    input: { flex: 1 }
})

FilterProduct.Price = FilterByPrice
FilterProduct.SortBy = SortBy

export default FilterProduct