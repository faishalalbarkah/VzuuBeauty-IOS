import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Platform } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import Routes from './routes'
import store from './services/store'
import { fonts } from './utils'

const App = () =>
{
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Routes />
            </NavigationContainer>
            <FlashMessage
                position="top"
                floating={Platform.OS === 'ios'}
                icon="auto"
                titleStyle={{ fontFamily: fonts.primary[400] }}
                style={{ alignItems: 'center' }}
            />
        </Provider>
    )
}

export default App