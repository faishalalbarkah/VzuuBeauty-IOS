import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { TabItem } from '../../molecules'
import { colors } from '../../../utils'

const BottomNavigator = ({ state, descriptors, navigation }) =>
{
    return (
        <View style={styles.container}>
            {
                state.routes.map((route, index) =>
                {
                    const { options } = descriptors[route.key]
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name

                    const isFocused = state.index === index

                    const onPress = () =>
                    {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if(!isFocused && !event.defaultPrevented)
                        {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true })
                        }
                    }

                    const onLongPress = () =>
                    {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        })
                    }

                    return (
                        <TabItem
                            key={index}
                            title={label}
                            icon={options.tabBarIcon}
                            active={isFocused}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        />
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 30 : 12,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    }
})

export default BottomNavigator