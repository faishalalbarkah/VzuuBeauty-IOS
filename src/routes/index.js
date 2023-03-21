import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useSelector } from 'react-redux'
import {
    AddNewAddress,
    Address,
    Cart,
    ChangePassword,
    CreateReview,
    EditAddress,
    EditProfile,
    Login,
    OrderDetail,
    Payment,
    ProductDetail,
    Register,
    RequestResetPassword,
    Review,
    Search,
    SelectPayment,
    Settings,
    Shipment,
    TrackShipment,
    VerifyWithOTP,
    Wishlists
} from '../pages'
import { getData } from '../utils'
import Tabs from './tabs'

const Stack = createStackNavigator()

const AuthenticatedRoutes = () =>
{
    return (
        <Stack.Navigator
            initialRouteName="Tabs"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="AddNewAddress"
                component={AddNewAddress}
                options={{ title: 'Add New Address' }}
            />
            <Stack.Screen
                name="Address"
                component={Address}
                options={{ title: 'Address' }}
            />
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{ title: 'Cart' }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ title: 'Change Password' }}
            />
            <Stack.Screen
                name="CreateReview"
                component={CreateReview}
                options={{ title: 'Create Review' }}
            />
            <Stack.Screen
                name="EditAddress"
                component={EditAddress}
                options={{ title: 'Edit Address' }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{ title: 'Order Detail' }}
            />
            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{ title: 'Payment' }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{ title: 'Product Detail' }}
            />
            <Stack.Screen
                name="Review"
                component={Review}
                options={{ title: 'Product Review' }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{ title: 'Search' }}
            />
            <Stack.Screen
                name="SelectPayment"
                component={SelectPayment}
                options={{ title: 'Select Payment' }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ title: 'Settings' }}
            />
            <Stack.Screen
                name="Shipment"
                component={Shipment}
                options={{ title: 'Shipment' }}
            />
            <Stack.Screen
                name="TrackShipment"
                component={TrackShipment}
                options={{ title: 'Track Shipment' }}
            />
            <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{ title: 'Tab View' }}
            />
            <Stack.Screen
                name="Wishlists"
                component={Wishlists}
                options={{ title: 'Wishlists' }}
            />
        </Stack.Navigator>
    )
}

const UnauthenticatedRoutes = () =>
{
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Login' }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ title: 'Register' }}
            />
            <Stack.Screen
                name="RequestResetPassword"
                component={RequestResetPassword}
                options={{ title: 'Submit Email for Reset Password' }}
            />
            <Stack.Screen
                name="VerifyWithOTP"
                component={VerifyWithOTP}
                options={{ title: 'Verify with OTP' }}
            />
        </Stack.Navigator>
    )
}

const Routes = () =>
{
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const { data: loginStatus } = useSelector(state => state.login)
    const { data: logoutStatus } = useSelector(state => state.logout)

    const isAuthenticated = async () =>
    {
        const accessToken = await getData('access_token')
        if(accessToken) setIsLoggedIn(true)
        else setIsLoggedIn(false)

        SplashScreen.hide()
    }

    useEffect(() =>
    {
        isAuthenticated()
    }, [loginStatus === 'success', logoutStatus === 'success'])

    return (
        <>
            {isLoggedIn && <AuthenticatedRoutes />}
            {!isLoggedIn && <UnauthenticatedRoutes />}
        </>
    )
}

export default Routes