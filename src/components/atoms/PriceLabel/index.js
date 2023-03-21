import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { StyleSheet } from 'react-native'
import Text from '../Text'

const PriceLabel = ({ value, color, textSize, textType, textStrikeThrough, lineHeight, style }) =>
{
    let fontWeight = 600

    if(textType === 'light') fontWeight = 300
    if(textType === 'regular') fontWeight = 400
    if(textType === 'medium') fontWeight = 500
    if(textType === 'semibold') fontWeight = 600

    return (
        <CurrencyFormat
            value={value}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp '}
            renderText={value => (
                <Text
                    color={color}
                    fontWeight={fontWeight}
                    style={[styles.price(textSize, textStrikeThrough, lineHeight), style]}
                >
                    {value}
                </Text>)}
        />
    )
}

const styles = StyleSheet.create({
    price: (textSize, textStrikeThrough, lineHeight) => ({
        fontSize: typeof textSize === 'number' ? textSize : 12,
        lineHeight: typeof lineHeight === 'number' ? lineHeight : undefined,
        textDecorationLine: textStrikeThrough && 'line-through',
        textDecorationStyle: 'solid'
    })
})

export default PriceLabel