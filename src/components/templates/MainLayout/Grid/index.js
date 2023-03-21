import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { colors, screenWidth } from '../../../../utils'
import { Gap, Link, SectionTitle } from '../../../atoms'

const Grid = ({ refreshControl, ListHeaderComponent, ListEmptyComponent, sectionTitle, headerLink, data, renderItem, columns, columnSpacing, disableSpacing }) =>
{
    const currColumns = typeof columns === 'number' ? (columns > 6 ? 6 : columns) : 2
    const currSpacing = typeof columnSpacing === 'number' ? columnSpacing : 10
    const columnWidth = (screenWidth - 15 * 2) / currColumns - (currSpacing - currSpacing / currColumns)

    return (
        <FlatList
            style={styles.content}
            refreshControl={refreshControl}
            ListHeaderComponent={
                <>
                    <Gap height={15} />
                    {ListHeaderComponent}
                    {(typeof sectionTitle === 'string' || headerLink) && (
                        <View style={styles.sectionHeader}>
                            {sectionTitle && <SectionTitle text={sectionTitle} />}
                            {headerLink && (
                                <Link
                                    title={headerLink.title}
                                    textDecoration="none"
                                    color={colors.primary}
                                    fontWeight={500}
                                    onPress={headerLink.onPress}
                                />
                            )}
                        </View>
                    )}
                </>
            }
            ListEmptyComponent={ListEmptyComponent}
            data={data}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item, index }) => (
                <View style={styles.column(columnWidth, currColumns, currSpacing, disableSpacing, index)}>
                    {renderItem(item)}
                </View>
            )}
            keyExtractor={item => item.id}
            numColumns={currColumns}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    content: { backgroundColor: colors.background },
    sectionHeader:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 10
    },
    columnWrapper: { paddingHorizontal: 15 },
    column: (width, cols, spacing, disableSpacing, index) => ({
        width: width,
        marginRight: disableSpacing
            ? 0
            : (index + 1) % cols !== 0
                ? spacing
                : 0,
        marginBottom: disableSpacing ? 0 : spacing,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        borderRadius: 8,
        backgroundColor: colors.white
    })
})

export default Grid