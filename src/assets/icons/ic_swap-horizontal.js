import React from 'react'
import Svg, { Path } from 'react-native-svg'

const IcSwapHorizontal = ({ filled, size, color }) =>
{
    if(filled === true)
    {
        return (
            <Svg
                width={size}
                height={size}
                viewBox="0 0 512 512"
                stroke={color}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            >
                <Path d="M304 48l112 112-112 112M398.87 160H96M208 464L96 352l112-112M114 352h302"/>
            </Svg>
        )
    }

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
        >
            <Path d="M304 48l112 112-112 112M398.87 160H96M208 464L96 352l112-112M114 352h302"/>
        </Svg>
    )
}

export default IcSwapHorizontal