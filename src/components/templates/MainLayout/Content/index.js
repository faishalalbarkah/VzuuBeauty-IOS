import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { colors } from '../../../../utils'
import { Gap } from '../../../atoms'

const Content = ({ children, bg, scrollable, refreshControl, horizontalSpace, disablePadding, showsHorizontalScrollIndicator, showsVerticalScrollIndicator }) =>
{
    const showsScrollX = showsHorizontalScrollIndicator === undefined ? false : true
    const showsScrollY = showsVerticalScrollIndicator === undefined ? false : true

    return (
        <View style={styles.content(bg, scrollable, horizontalSpace, disablePadding)}>
            {scrollable === undefined || scrollable
                ? 
                (
                    <ScrollView
                        style={styles.scrollView(horizontalSpace, disablePadding)}
                        refreshControl={refreshControl}
                        showsHorizontalScrollIndicator={showsScrollX}
                        showsVerticalScrollIndicator={showsScrollY}
                    >
                        {!disablePadding && <Gap height={15} />}
                        {children}
                    </ScrollView>
                )
                :
                (
                    <>
                        {!disablePadding && <Gap height={15} />}
                        {children}
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    content: (bg, scrollable, horizontalSpace, disablePadding) => ({
        flex: 1,
        backgroundColor: bg ? bg : colors.background,
        paddingHorizontal: scrollable === undefined || scrollable ? 0 : typeof horizontalSpace === 'number' ? horizontalSpace : disablePadding ? 0 : 15
    }),
    scrollView: (horizontalSpace, disablePadding) => ({
        paddingHorizontal: typeof horizontalSpace === 'number' ? horizontalSpace : disablePadding ? 0 : 15
    })
})

export default Content