import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../../utils'
import Link from '../Link'
import Text from '../Text'

const Card = ({
    children,
    title,
    titleVariant,
    headerLink,
    bg,
    horizontalSpace,
    bottomSpace,
    flexDir,
    alignItems,
    outlineColor,
    padding,
    paddingHorizontal,
    paddingVertical,
    rounded
}) =>
{
    let borderRadius = 8

    if(rounded === 'sm') borderRadius = 5
    if(rounded === 'md') borderRadius = 8
    if(rounded === 'lg') borderRadius = 10
    if(rounded === 'xl') borderRadius = 15

    return (
        <View style={styles.container(bg, horizontalSpace, bottomSpace, flexDir, alignItems, outlineColor, padding, paddingHorizontal, paddingVertical, borderRadius)}>
            {(typeof title === 'string' || (typeof headerLink === 'object' && headerLink !== null)) && (
                <View style={styles.titleWrapper(titleVariant)}>
                    {typeof title === 'string' && (
                        <Text style={styles.title(titleVariant)} fontWeight={500}>{title}</Text>
                    )}
                    {(typeof headerLink === 'object' && headerLink !== null) && (
                        <Link
                            title={headerLink.title}
                            textDecoration="none"
                            color={colors.primary}
                            textSize={12}
                            onPress={headerLink.onPress}
                        />
                    )}
                </View>
            )}
            {children}
        </View>
    )
}

const Row = ({ children, justifyContent, alignItems, topSpace, bottomSpace }) =>
{
    return (
        <View style={styles.row(justifyContent, alignItems, topSpace, bottomSpace)}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: (bg, horizontalSpace, bottomSpace, flexDir, alignItems, outlineColor, padding, paddingHorizontal, paddingVertical, borderRadius) => ({
        flexDirection: flexDir === 'row' ? 'row' : 'column',
        alignItems: typeof alignItems === 'string' ? alignItems : 'center',
        padding: typeof padding === 'number' ? padding : 10,
        paddingHorizontal: typeof paddingHorizontal === 'number' ? paddingHorizontal : undefined,
        paddingVertical: typeof paddingVertical === 'number' ? paddingVertical : undefined,
        backgroundColor: bg ? bg : colors.white,
        borderWidth: outlineColor ? 1 : 0,
        borderColor: typeof outlineColor === 'string' ? outlineColor : colors.border,
        borderRadius,
        marginHorizontal: typeof horizontalSpace === 'number' ? horizontalSpace : 0,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    titleWrapper: titleVariant => ({
        width: '100%',
        borderBottomWidth: (typeof titleVariant === 'string' && titleVariant === 'uppercase') ? 0 : 1,
        borderBottomColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }),
    title: titleVariant => ({
        color: (typeof titleVariant === 'string' && titleVariant === 'uppercase') ? '#cccccc' : colors.text.secondary,
        fontSize: 14,
        paddingBottom: (typeof titleVariant === 'string' && titleVariant === 'uppercase') ? 15 : 10,
        textTransform: (typeof titleVariant === 'string' && titleVariant === 'uppercase') ? titleVariant : undefined
    }),
    row: (justifyContent, alignItems, topSpace, bottomSpace) => ({
        width: '100%',
        flexDirection: 'row',
        justifyContent,
        alignItems: typeof alignItems === 'string'
            ? alignItems === 'none'
                ? undefined
                : alignItems
            : 'center',
        marginTop: typeof topSpace === 'number' ? topSpace : 0,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
})

Card.Row = Row

export default Card