import React from 'react'
import { View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import Icon from '../../components/atoms/Icon'
import { colors } from '../colors'

const MessageIcon = (type) =>
{
    let icon
    if(type === 'error') icon = 'close-circle'
    if(type === 'success') icon = 'checkmark-circle'
    if(type === 'warning') icon = 'alert-circle'

    return (
        <View style={{ marginRight: 10 }}>
            <Icon name={icon} filled size={20} color="white" />
        </View>
    )
}

export const showError = (message) =>
{
    showMessage({
        message,
        type: 'default',
        backgroundColor: colors.error,
        color: 'white',
        renderFlashMessageIcon: () => MessageIcon('error')
    })
}

export const showSuccess = (message) =>
{
    showMessage({
        message,
        type: 'default',
        backgroundColor: colors.success,
        color: 'white',
        renderFlashMessageIcon: () => MessageIcon('success')
    })
}

export const showWarning = (message) =>
{
    showMessage({
        message: message,
        type: 'default',
        backgroundColor: colors.warning,
        color: 'white',
        renderFlashMessageIcon: () => MessageIcon('warning')
    })
}