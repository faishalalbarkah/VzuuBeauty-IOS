import React, { useRef } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { Header, MainLayout } from '../../components'

const Payment = ({ navigation, route }) =>
{
    const webViewRef = useRef(null)

    const onBrowserMessage = event => console.log(event.nativeEvent.data)

    return (
        <MainLayout>
            <Header
                title="Pembayaran"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <WebView
                source={{ uri: 'https://reactnative.dev' }}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator />}
                ref={webViewRef}
                onMessage={onBrowserMessage}
            />
        </MainLayout>
    )
}

const styles = StyleSheet.create({})

export default Payment