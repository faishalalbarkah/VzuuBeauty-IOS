import React, { forwardRef, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { colors, fonts } from '../../../utils'
import { Input, Text } from '../../atoms'

const AutoPicker = forwardRef(({ title, inputPlaceholder, data, filterKeyExtractor, renderItem }, ref) =>
{
    const [suggestions, setSuggestions] = useState([])
    const [filteredSuggestions, setFilteredSuggestions] = useState([])

    const findData = (query) =>
    {
        if(query)
        {
            const regex = new RegExp(`${query.trim()}`, 'i')

            setFilteredSuggestions(
                suggestions.filter(suggestion => filterKeyExtractor(suggestion).search(regex) >= 0)
            )
        }
        else
        {
            setFilteredSuggestions([])
        }
    }

    useEffect(() =>
    {
        setSuggestions(data)
    }, [data])

    return (
        <RBSheet
            ref={ref}
            height={450}
            closeOnDragDown={true}
            closeOnPressMask={true}
            onClose={() => setFilteredSuggestions([])}
            customStyles={{ container: styles.container }}
        >
            {typeof title === 'string' && (
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            )}
            <View style={styles.wrapper}>
                <Input
                    icon="search"
                    placeholder={inputPlaceholder}
                    disableBgColor
                    variant="small"
                    onChangeText={value => findData(value)}
                    bottomSpace={10}
                    autoFocus
                />
                {filteredSuggestions && filteredSuggestions.length > 0 && (
                    <ScrollView style={styles.suggestionsContainer}>
                        {filteredSuggestions.map((item, index) =>
                        {
                            item.reset = setFilteredSuggestions
                            return renderItem(item, index)
                        })}
                    </ScrollView>
                )}
            </View>
        </RBSheet>
    )
})

const SuggestionItem = ({ name, onPress }) =>
{
    return (
        <TouchableOpacity
            style={styles.suggestionItem}
            onPress={onPress}
        >
            <Text>{name}</Text>
        </TouchableOpacity>
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
        justifyContent: 'center',
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
    wrapper: { padding: 15 },
    suggestionsContainer:
    {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        backgroundColor: 'rgba(222, 222, 222, 0.1)',
        maxHeight: 300
    },
    suggestionItem:
    {
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})

AutoPicker.SuggestionItem = SuggestionItem

export default AutoPicker