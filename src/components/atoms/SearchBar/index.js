import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils'
import Icon from '../Icon'
import Text from '../Text'

const SearchBar = ({ bottomSpace }) =>
{
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.container(bottomSpace)} onPress={() => navigation.navigate('Search')}>
            <Icon name="search" filled size={20} color="#757575" />
            <Text style={styles.text}>Telusuri ...</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    text:
    {
        color: colors.text.secondary,
        fontFamily: fonts.primary[300],
        fontSize: 12,
        marginLeft: 5
    }
})

export default SearchBar