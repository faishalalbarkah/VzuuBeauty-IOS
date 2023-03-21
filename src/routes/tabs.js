import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { BottomNavigator } from '../components'
import { Account, Home, Payment, Products, Transactions } from '../pages'

const Tab = createBottomTabNavigator()

const Tabs = () =>
{
    return (
        <Tab.Navigator
            tabBar={props => <BottomNavigator {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Beranda',
                    tabBarIcon: 'home'
                }}
            />
            <Tab.Screen
                name="Products"
                component={Products}
                options={{
                    tabBarLabel: 'Produk',
                    tabBarIcon: 'price-tag'
                }}
            />
            <Tab.Screen
                name="Transactions"
                component={Transactions}
                options={{
                    tabBarLabel: 'Transaksi',
                    tabBarIcon: 'swap-horizontal'
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabel: 'Akun',
                    tabBarIcon: 'person'
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs